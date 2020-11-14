const { product } = require("../models/products");

let productos = require("../data/products.json");
let fs = require("fs")

let path = require("path")


  
  


const productsController = {
  products: (req, res) => {
    let products = product.getProducts();
    res.render("product/product", { products });
  },

  productDetail: (req, res) => {
    console.log(req.params.id);
    let products = product.getProductById(req.params.id);
    console.log(product);
    res.render("product/productDetail", { product: products });
  },
  
  productEdition:(req,res)=>{
    let products = product.getProductById(req.params.id);
    res.render("product/productEdit", { product: product[0] });
    
  },
  
    create : (req,res) =>{
        res.render("../views/product/create");        
    },

    store: (req,res) =>{
    //traemos el contenido json a una variable
    //let content = fs.readFileSync("./data/products.json", {encoding: "utf-8"})
    console.log(req.files)
    //convertir el string en array json
    //products = JSON.parse(content)
    //agregar al array el producto nuevo
    productos.push({
        ...req.body, 
        
        image: req.files[0].filename,
        
        id : productos[productos.length-1].id+1


    }),

    
    //volver a convertir el array en string
    productos = JSON.stringify(productos);
    //escribir en la base de datos json;
    fs.writeFileSync("./data/products.json",productos)



   console.log(req.file)
    res.send("todo bien")
    }

  


};

module.exports = productsController;
