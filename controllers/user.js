const User = require("../models/User");

exports.signup = async (req, res) => {
  const user = new User(req.body);
  const saveduser = await user.save();
  res.json(saveduser);
};
