var slug = require("mongoose-slug-generator");
const mongoose = require("mongoose");
mongoose.plugin(slug);

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    quantity: {
      type: Number
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      required: false,
      type: Boolean
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
      slug_padding_size: 3
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
