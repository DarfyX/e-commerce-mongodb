const { hashPassword } = require("../utils/helpers");
const User = require("../database/models/UserSchema");
const { Error } = require("mongoose");

// // get all
const getUsers = async (req, res) => {
  const usersData = await User.find().select("-__v -password -_id").exec();

  if (!usersData) throw new Error("Users not found!");
  res.status(200).json(usersData);
};
// // get by username
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

module.exports = {
  getUsers,
  getUserByUsername,
  changeUserPassword,
  registerUser,
  deleteUser,
};
