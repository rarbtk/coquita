const fs = require("fs");
const pathOfProducts = "./data/products.json";
let products = JSON.parse(fs.readFileSync(pathOfProducts, "utf-8"));
//const products = require("../data/products.json");

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
  removeProductAndUpdate: (id) => {
    const newProducts = products.filter((item) => {
      return item.id != id;
    });
    fs.writeFileSync(pathOfProducts, JSON.stringify(newProducts));
  },
  updateJsonProducts: (productsJson) => {
    fs.writeFileSync(pathOfProducts, JSON.stringify(productsJson));
  },
};

module.exports = { Product: product };
