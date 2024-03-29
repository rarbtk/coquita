var express = require("express");
var router = express.Router();
const productsController = require("../controllers/productsControllers.js");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
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
router.get("/create", adminMiddleware, productsController.create);
router.post("/create", upload.any(), productsController.store);

/* GET all peoducts */
router.get("/", productsController.products);

//get product detail by id
router.get("/:id", productsController.productDetail);

//get product detail by id
router.get("/category/:category", productsController.productByCategory);
router.get("/list", productsController.productByQuery);

//Edit producto
//se tiene que escribir en el url product/productEdit/y cualquier id
router.get("/edit/:id", authMiddleware, productsController.productEdition);
router.put("/edit/:id", upload.any(), productsController.update);

// Delete product
router.delete("/delete/:id", productsController.delete);

module.exports = router;
