const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/Product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productBySlug = async (req, res, next, slug) => {
  const product = await Product.findOne({ slug }).populate("category", "name");
  if (!product) {
    return res.status(400).json({
      error: "Product not found"
    });
  }
  req.product = product;
  next();
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    let product = new Product(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    const newproduct = await product.save().catch(err => {
      console.log(err.message);
      return res.status(500).json({
        error: errorHandler(err) || "Something went wrong!"
      });
    });
    newproduct.photo = undefined;
    newproduct.populate("category", "name", () => {
      res.json(newproduct);
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    const newproduct = await product.save().catch(err => {
      console.log(err.message);
      return res.status(500).json({
        error: errorHandler(err) || "Something went wrong!"
      });
    });
    newproduct.photo = undefined;
    newproduct.populate("category", "name", () => {
      res.json(newproduct);
    });
  });
};

exports.remove = async (req, res) => {
  let product = req.product;
  await product.remove();
  res.json({
    message: "Product deleted successfully"
  });
};

exports.list = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  let product = await Product.find({})
    .select("-photo")
    .populate("category", "name")
    .sort([[sortBy, order]])
    .limit(limit);
  res.json(product);
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  const relatedproduct = await Product.find({
    _id: { $ne: req.product },
    category: req.product.category
  })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name");

  res.json(relatedproduct);
};

exports.listCategories = async (req, res) => {
  const categories = await Product.distinct("category");

  if(!categories) return res.status(400).json({message: "No category found"});

  res.json(categories);
}