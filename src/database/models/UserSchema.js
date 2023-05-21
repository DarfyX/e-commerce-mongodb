const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
