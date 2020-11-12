const { product } = require("../models/products");

const productsController = {
  products: (req, res) => {
    let products = product.getProducts();
    res.render("product/product", { products });
  },

  productDetail: (req, res) => {
    console.log(req.params.id);
    let product = product.getProductById(req.params.id);
    console.log(product);
    res.render("product/productDetail", { product: product[0] });
  },
};

module.exports = productsController;
