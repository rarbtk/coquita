const express = require("express");
const api = express.Router();
const userController = require("../../controllers/api/userController");
let { check } = require("express-validator");

// get all users
api.get("/", userController.users);

// get user by id
api.get("/:id", userController.user);

api.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email inválido"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("La contraseña debe tener al menos 5 caracteres"),
  ],
  userController.register
);

api.post("/login", userController.login);

api.get("/profile", userController.profile);

module.exports = api;
