var express = require("express");
var api = express.Router();
const paymentControllers = require("../../controllers/api/paymentControllers");

api.post("/v1/process_payment", paymentControllers.processPayment);

module.exports = api;
