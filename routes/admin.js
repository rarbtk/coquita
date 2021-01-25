var express = require("express");
var router = express.Router();
var adminMiddleware = require("../middleware/adminMiddleware")

const adminController = require("../controllers/adminController.js")
/* GET home page. */
router.get("/", adminController.products);
router.get("/profile/:id", adminController.profilebyID);
router.delete("/delete/:id", adminController.delete);

module.exports = router;