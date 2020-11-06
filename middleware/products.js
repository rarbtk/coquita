const products = require("../data/products.json");

const productsMiddleware = {
  getProducts: (category) => {
    return products;
  },

  getProductById: (id) => {
    let product = products.filter(function (item) {
      return id == item.id;
    });
    console.log("FOUND" + product);
    return product;
  },
};

module.exports = { productsMiddleware };
