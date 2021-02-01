const express = require("express");
const api = express.Router();
const userController = require("../../controllers/api/userController");
let { check } = require("express-validator");

api.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email inválido"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("La contraseña debe tener al menos 5 caracteres"),
  ],
  userController.registerUser
);

module.exports = api;
