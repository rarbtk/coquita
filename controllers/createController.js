let products = require("../data/products.json");
let fs = require("fs")
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

const createController = {
    create : (req,res) =>{
        res.render("../views/product/create");        
    },

    store: (req,res) =>{
    //traemos el contenido json a una variable
    let content = fs.readFileSync("./data/products.json", {encoding: "utf-8"})
    
    //convertir el string en array json
    content = JSON.parse(content)
    //agregar al array el producto nuevo
    content.push({
        ...req.body,
        id : products[products.length-1].id+1


    }),

    //volver a convertir el array en string
    content = JSON.stringify(content);
    //escribir en la base de datos json;
    fs.writeFileSync("./data/products.json",content)



   console.log(req.file)
    res.send("todo bien")
    },
};


module.exports = createController;