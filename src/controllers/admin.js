const Product = require("../database/models/ProductSchema");
const { Error } = require("mongoose");

// add new product
const addNewProduct = async (req, res) => {
  const { name, image, price, description, category } = req.body;

  const newProduct = await Product.insertMany({
    name,
    image,
    price,
    description,
    category,
  });
  if (!newProduct) throw new Error("Product not added");
  res.status(201).send("New product added!");
};

// update product
const updateProduct = async (req, res) => {
  const { id, name, image, price, description, category } = req.body;
  const productData = await Product.updateOne({_id: id}, {
    set: { name, image, price, description, category },
  });
  if (!productData) throw new Error("Update failed");
  res
    .status(201)
    .send({ code: "02", success: true, message: "Product updated!" });
};

// delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndRemove({ id });
  res
    .status(200)
    .send({ code: "04", success: true, message: "Product deleted!" });
};

module.exports = {
  addNewProduct,
  updateProduct,
  deleteProduct,
};
