const { productsMiddleware } = require("../middleware/products");

const productsController = {
  products: (req, res) => {
    let products = productsMiddleware.getProducts();
    res.render("product/product", { products });
  },

  productDetail: (req, res) => {
    console.log(req.params.id);
    let product = productsMiddleware.getProductById(req.params.id);
    console.log(product);
    res.render("product/productDetail", { product: product[0] });
  },
};

module.exports = productsController;
