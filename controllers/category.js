const Category = require("../models/Category");

exports.categoryById = async (req, res, next, id) => {
  const category = await Category.findById(id);

  if (!category) return res.status(400).json({ error: "No category found" });

  req.category = category;

  next();
};

exports.create = async (req, res) => {
  const newcategory = new Category(req.body);
  const category = await newcategory.save();
  res.json(category);
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  const updatedcategory = await category.save();
  res.json(updatedcategory);
};

exports.remove = async (req, res) => {
  const category = req.category;
  await category.remove();
  res.json({ message: "Category successfully removed" });
};
