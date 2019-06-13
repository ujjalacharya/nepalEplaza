const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const newuser = new User(req.body);
  const user = await newuser.save();

  user.salt = undefined;
  user.hashed_password = undefined;
  res.json(user);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      error: "User with that email does not exist."
    });
  }

  if (!user.authenticate(password)) {
    return res.status(401).json({
      error: "Email and password do not match"
    });
  }

  const payload = {
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET
    // {expiresIn:"1h"}
  );

  res.cookie("t", token, { expire: new Date() + 9999 });

  // const { _id, email: mail, name, role } = user;
  return res.json({ token });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    const founduser = await User.findById(user._id).select("name role");

    if (founduser) {
      req.auth = founduser;
      next();
    } else res.status(401).json({ error: "Not authorized!" });
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
};

function parseToken(token) {
  try {
    // For cookie
    //   jwt.verify(token.split(";")[1].split("=")[1], process.env.JWT_SECRET)
    return jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

exports.isAuth = (req, res, next) => {
  let user =
    req.profile &&
    req.auth &&
    req.profile._id.toString() === req.auth._id.toString();
  if (!user) {
    return res.status(403).json({
      error: "Access denied"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.auth.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied"
    });
  }
  next();
};

exports.refreshToken = async (req, res) => {
  if (req.body && req.body.token) {
    const parsed = parseToken(`Bearer ${req.body.token}`);

    const user = await User.findById(parsed._id);

    const payload = {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET
      // {expiresIn:"1h"}
    );

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({ token });
  }
};
