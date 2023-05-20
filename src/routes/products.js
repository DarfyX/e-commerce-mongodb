const express = require("express");
const {
  getProducts,
  addNewProduct,
  getProductByRefCode,
  updatePriceByProductRefCode,
  deleteProductByRefCode,
} = require("../utils/controllers");
const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:refCode", getProductByRefCode);

productsRouter.use((req, res, next) => {
  console.log("Products auth check middleware");
  console.log(req.user);
  if (req.user) next();
  else res.send(401);
});

productsRouter.post("/new-product", addNewProduct);
productsRouter.put("/update-price", updatePriceByProductRefCode);
productsRouter.delete("/delete-product/:refCode", deleteProductByRefCode);

module.exports = productsRouter;