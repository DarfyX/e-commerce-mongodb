const { hashPassword } = require("./helpers");
const User = require("../database/schemas/UserSchema");
const Product = require("../database/schemas/ProductSchema");
const { Error } = require("mongoose");

// // get all
const getUsers = async (req, res) => {
  const usersData = await User.find().select("-__v -password -_id").exec();

  if (!usersData) throw new Error("Users not found!");
  res.status(200).json(usersData);
};
// // get by userId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  const userData = await User.findOne({ userId })
    .select("-__v -password -_id")
    .exec();

  if (!userData) {
    res
      .status(200)
      .send({ code: "03", success: true, message: "User not found!" });
  } else {
    res.status(200).json(userData);
  }
};

// // change user password
const changeUserPassword = async (req, res) => {
  const { email } = req.body;
  const userData = await User.findOne({ email });

  if (!userData) {
    res
      .status(200)
      .send({ code: "03", success: true, message: "User not found!" });
  } else {
    const newPassword = hashPassword(req.body.password);
    await User.updateOne({ email }, { $set: { password: newPassword } });
    res
      .status(201)
      .send({ code: "02", success: true, message: "Password changed!" });
  }
};

// register new user
const registerUser = async (req, res) => {
  const { email } = req.body;
  const userData = await User.findOne({ email });

  if (!userData) {
    const password = hashPassword(req.body.password);
    await User.create({ email, password });
    res
      .status(201)
      .send({ code: "00", success: true, message: "User created!" });
  } else {
    res
      .status(200)
      .send({ code: "01", success: true, message: "User already exists!" });
  }
};

// get all products
const getProducts = async (req, res) => {
  const { category } = req.query;

  const productList = await Product.find().select("-__v -_id").exec();
  if (!productList) throw new Error("No products found!");
  if (category) {
    const filteredProducts = productList.filter(
      (p) => p.category.toLowerCase() == category.toLowerCase()
    );
    res.send(filteredProducts);
  } else res.status(200).send(productList);
};

// get product by id
const getProductById = async (req, res) => {
  const { productId } = req.params;

  const productData = await Product.findOne({ productId })
    .select("-__v -_id")
    .exec();

  if (!productData) {
    res
      .status(200)
      .send({ code: "03", success: true, message: "Product not found!" });
  } else {
    res.status(200).json(productData);
  }
};

// add new product
const addNewProduct = async (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = await Product.insertMany({ name, price, category });
  if (!newProduct) throw new Error("Product not added");
  res.status(201).send("New product added!");
};

// update product price
const updatePriceByProductId = async (req, res) => {
  const { productId } = req.body;
  const productData = await Product.findOne({ productId });
  if (!productData) {
    res
      .status(200)
      .send({ code: "03", success: true, message: "Product not found!" });
  } else {
    const newPrice = req.body.price;
    await Product.updateOne({ productId }, { $set: { price: newPrice } });
    res
      .status(201)
      .send({ code: "02", success: true, message: "Price updated!" });
  }
};

// delete product
const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  await Product.deleteOne({ productId });
  res.status(200).send({ code: "04", success: true, message: "Product deleted!" });
};

module.exports = {
  getUsers,
  getUserById,
  changeUserPassword,
  registerUser,
  getProducts,
  addNewProduct,
  getProductById,
  updatePriceByProductId,
  deleteProductById,
};
