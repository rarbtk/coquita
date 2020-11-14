var express = require("express");
var router = express.Router();
const productsController = require("../controllers/productsControllers.js");
const products = require("../data/products.json");
let multer = require("multer");
let path = require("path");

//
var config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
    console.log(file);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: config });

router.get("/creation", productsController.create);

router.post("/creation", upload.any(), productsController.store);

//

/* GET all peoducts */
router.get("/", productsController.products);

router.get("/create", function (req, res, next) {
  res.render("product/create");
});

//get product detail by id
router.get("/:id", productsController.productDetail);

//Edit producto
//se tiene que escribir en el url product/productEdit/y cualquier id
router.get("/edit/:id", productsController.productEdition);
router.put("/edit/:id", upload.any(), productsController.update);

module.exports = router;
