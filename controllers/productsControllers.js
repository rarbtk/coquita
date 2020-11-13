const { product } = require("../models/products");

const productsController = {
  products: (req, res) => {
    let products = product.getProducts();
    res.render("product/product", { products });
  },

  productDetail: (req, res) => {
    console.log(req.params.id);
    let products = product.getProductById(req.params.id);
    console.log(product);
    res.render("product/productDetail", { product: product[0] });
  },
  
  productEdition:(req,res)=>{
    let products = product.getProductById(req.params.id);
    res.render("product/productEdit", { product: product[0] });
    
  }
};

module.exports = productsController;
