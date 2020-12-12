const fs = require("fs");
let pathOfProducts = "./data/products.json";
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
    let newProducts = products.indexOf((item) => {
      products.splice(newProducts, item);
      return newProducts;
    });

    /*
    function removeItemFromArr ( arr, item ) { var i = arr.indexOf( item ); arr.splice( i, 1 ); } 
    */

    console.log("NUEVOS PRODUCTOS", newProducts);
    fs.writeFileSync(pathOfProducts, JSON.stringify(newProducts));
  },
  updateJsonProducts: (productsJson) => {
    fs.writeFileSync(pathOfProducts, JSON.stringify(productsJson));
  },
};

module.exports = { Product: product };
