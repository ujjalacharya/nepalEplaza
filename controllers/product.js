const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/Product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productBySlug = async (req, res, next, slug) => {
  const product = await Product.findOne({ slug });
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
    console.log(fields);
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity) {
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

  if (!categories)
    return res.status(400).json({ message: "No category found" });

  res.json(categories);
};

/**
 * list products by search
 * Will implement product search in react frontend
 * Will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * Will make api request and show the products to users based on what he wants
 */

exports.listBySearch = async (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip) || 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log("findArgs", findArgs);

  const product = await Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit);
  if (!product) return res.status(400).json({ message: "No product found" });
  res.json({
    size: product.length,
    product
  });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
