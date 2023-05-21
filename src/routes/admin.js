const express = require("express");
const { addNewProduct, deleteProduct, updateProduct } = require("../controllers/admin");

productsRouter.use((req, res, next) => {
    console.log("Products auth check middleware");
    console.log(req.user);
    if (req.user) next();
    else res.send(401);
  });
  

productsRouter.post("/new", addNewProduct);
productsRouter.put("/update", updateProduct);
productsRouter.delete("/delete/:id", deleteProduct);

module.exports = productsRouter;