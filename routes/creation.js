var express = require("express");
var router = express.Router();
const createController = require("../controllers/createController")
let multer = require("multer")
let path = require("path")



var config= multer.diskStorage({

destination : (req, file, cb) =>{

    cb(null, "public/images")



},

filename : (req, file, cb) =>{

    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
}

})

var upload = multer({storage : config})


router.get("/", createController.create);

router.post("/", upload.any() ,createController.store);

module.exports = router;