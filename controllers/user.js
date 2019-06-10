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
    id: user.id,
    role: user.role
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET
    // {expiresIn:"1h"}
  );

  res.cookie("t", token, { expire: new Date() + 9999 });

  const { _id, email: mail, name, role } = user;
  return res.json({ token, user: { _id, mail, name, role } });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
