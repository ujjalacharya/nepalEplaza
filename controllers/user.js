const User = require("../models/User");

exports.userById = async (req, res, next, id) => {
  const user = await User.findById(id);
  if (user) {
    user.salt = undefined;
    user.hashed_password = undefined;
    req.profile = user;
    next();
  } else {
    res.status(400).json({ error: "User not found!" });
  }
};

exports.read = (req, res) => {
  return res.json(req.profile);
};

exports.update = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true }
  );
  user.hashed_password = undefined;
  user.salt = undefined;
  res.json(user);
};
