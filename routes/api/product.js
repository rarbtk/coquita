const express = require("express");
const api = express.Router();
const productController = require("../../controllers/api/productController");

// get all products
//api.get("/", productController.products);

// get user by id
api.get("/",productController.getAllProducts)
api.get("/:id", productController.getProductById);


// postear un producto ##### TO-DO ########

module.exports = api;
