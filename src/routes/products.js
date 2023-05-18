const express = require("express");
const {
  getProducts,
  addNewProduct,
  getProductById,
  updatePriceByProductId,
  deleteProductById,
} = require("../utils/controllers");
const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:productId", getProductById);

productsRouter.use((req, res, next) => {
  console.log("Products auth check middleware");
  console.log(req.user);
  if (req.user) next();
  else res.send(401);
});

productsRouter.post("/new-product", addNewProduct);
productsRouter.put("/update-price", updatePriceByProductId);
productsRouter.delete("/delete-product/:productId", deleteProductById);

module.exports = productsRouter;