const products = require("../data/products.json");

const product = {
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

module.exports = { product };
