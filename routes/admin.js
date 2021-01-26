var express = require("express");
var router = express.Router();
var adminMiddleware = require("../middleware/adminMiddleware")

const adminController = require("../controllers/adminController.js")
const userControllers = require("../controllers/userControllers.js")
/* GET home page. */
router.get("/", adminController.products);
router.get("/profile/:id", adminController.profile);
router.post("/delete/:id", adminController.deleteUser);

module.exports = router;