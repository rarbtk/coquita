const express = require("express");
const api = express.Router();

const avatarController = require("../../controllers/api/avatarControllers");

api.get("/", avatarController.getAvatar);

module.exports = api;
