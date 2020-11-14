const products = require("../data/products.json");

const product = {
  getProducts: (category) => {
    return products;
  },

  getProductById: (id) => {
    let product = products.find(function (item) {
      return id == item.id;
    });
    return product;
  },
};

module.exports = { product };
