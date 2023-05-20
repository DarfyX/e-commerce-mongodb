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
const getUserByUsername = async (req, res) => {
  const { username } = req.params;

  const userData = await User.findOne({ username })
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
  const { username, email } = req.body;
  const userData = await User.findOne({ email });

  if (!userData) {
    const password = hashPassword(req.body.password);
    await User.create({ username, email, password });
    res
      .status(201)
      .send({ code: "00", success: true, message: "User created!" });
  } else {
    res
      .status(200)
      .send({ code: "01", success: true, message: "User already exists!" });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const { username } = req.params;

  await User.deleteOne({ username });
  res.status(200).send({ code: "04", success: true, message: "User deleted!" });
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

// get product by refCode
const getProductByRefCode = async (req, res) => {
  const { refCode } = req.params;

  const productData = await Product.findOne({ refCode })
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
const updatePriceByProductRefCode = async (req, res) => {
  const { refCode } = req.body;
  const productData = await Product.findOne({ refCode });
  if (!productData) {
    res
      .status(200)
      .send({ code: "03", success: true, message: "Product not found!" });
  } else {
    const newPrice = req.body.price;
    await Product.updateOne({ refCode }, { $set: { price: newPrice } });
    res
      .status(201)
      .send({ code: "02", success: true, message: "Price updated!" });
  }
};

// delete product
const deleteProductByRefCode = async (req, res) => {
  const { refCode } = req.params;

  await Product.deleteOne({ refCode });
  res.status(200).send({ code: "04", success: true, message: "Product deleted!" });
};

module.exports = {
  getUsers,
  getUserByUsername,
  changeUserPassword,
  registerUser,
  deleteUser,
  getProducts,
  addNewProduct,
  getProductByRefCode,
  updatePriceByProductRefCode,
  deleteProductByRefCode,
};
