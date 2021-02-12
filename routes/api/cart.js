const express = require("express");
const api = express.Router();
const cartController = require("../../controllers/api/cartController");

api.post("/create", cartController.create);
api.post("/finish", cartController.close);


//add item to cart
api.post("/item", cartController.createItem);

//delete item
api.delete("/item", cartController.deleteItem);

//get cart by cartId
api.get("/:id", cartController.getCartById);

// get cart by userId
api.get("/user/:id", cartController.getCartByUserId);

module.exports = api;
