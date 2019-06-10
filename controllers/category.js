const Category = require("../models/Category");

exports.create = async (req, res) => {
  const newcategory = new Category(req.body);
  const category = await newcategory.save();
  res.json(category);
};