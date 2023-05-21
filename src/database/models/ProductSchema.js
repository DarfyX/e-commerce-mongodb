const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  refCode: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    default: Math.floor(Math.random() * 100000),
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  image: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  price: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  category: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
