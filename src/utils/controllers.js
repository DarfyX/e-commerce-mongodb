const { hashPassword } = require("./helpers");
const User = require("../database/schemas/UserSchema");

// // get all
const getUsers = async (req, res) => {
  const usersData = await User.find().select("-__v -password").exec();
  
  if (!usersData) throw new Error("Users not found!");
  res.status(200).json(usersData);
};
// // get by userId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  const userData = await User.findOne({ userId })
    .select("-__v -password")
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
    const password = hashPassword(req.body.password);
    await User.updateOne({ email: email }, { $set: { password: password } });
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

module.exports = {
  getUsers,
  getUserById,
  changeUserPassword,
  registerUser,
};
