const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        productId: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product",
          required: true,
        },
      },
      qty: {
        type: mongoose.SchemaTypes.Number,
        required: true,
      },
    },
  ],
  sum: mongoose.SchemaTypes.Number,
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
