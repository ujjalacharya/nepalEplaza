const User = require("../models/User");

exports.signup = async (req, res) => {
  const newuser = new User(req.body);
  const user = await newuser.save();

  user.salt = undefined;
  user.hashed_password = undefined;
  res.json(user);
};
