const express = require("express");
const api = express.Router();
const cartController = require("../../controllers/api/cartController");

api.post("/create", cartController.create);

//add item to cart
api.post("/item", cartController.createItem);

//delete item
api.delete("/item", cartController.deleteItem);

module.exports = api;
