const express = require("express");
const {
  getProducts, getProductByRefCode,
} = require("../controllers/shop");
const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:refCode", getProductByRefCode);

module.exports = productsRouter;