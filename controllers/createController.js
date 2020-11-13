let products = require("../data/products.json");
let fs = require("fs")


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



   
    res.send("todo bien")
    },
};


module.exports = createController;