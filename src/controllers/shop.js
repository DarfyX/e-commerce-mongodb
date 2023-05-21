const Product = require("../database/models/ProductSchema");
const { Error } = require("mongoose");

// get all products
const getProducts = async (req, res) => {
  const { category } = req.query;

  const productList = await Product.find().select("-__v").exec();
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
  const productData = await Product.findById(refCode).select("-__v").exec();

  if (!productData) {
    res
      .status(200)
      .send({ code: "03", success: true, message: "Product not found!" });
  } else {
    res.status(200).json(productData);
  }
};



module.exports = {
  getProducts,
  getProductByRefCode,
};
