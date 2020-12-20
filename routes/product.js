var express = require("express");
var router = express.Router();
const productsController = require("../controllers/productsControllers.js");
//const products = require("../data/products.json");
const authMiddleware = require("../middleware/authMiddleware");
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

// Create product routes
router.get("/create", productsController.create);
router.post("/create", upload.any(), productsController.store);

/* GET all peoducts */
router.get("/", productsController.products);

//get product detail by id
router.get("/:id", productsController.productDetail);

//Edit producto
//se tiene que escribir en el url product/productEdit/y cualquier id
router.get("/edit/:id", authMiddleware, productsController.productEdition);
router.put("/edit/:id", upload.any(), productsController.update);

// Delete product
router.delete("/delete/:id", productsController.delete);

module.exports = router;
