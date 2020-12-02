var express = require("express");
var router = express.Router();
var adminMiddleware = require("../middleware/adminMiddleware")

/* GET home page. */
router.get("/", adminMiddleware, function (req, res, next) {
  res.render("admin/administracion");
});

module.exports = router;
