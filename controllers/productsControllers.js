//const { Product } = require("../models/products");
let db = require("../database/models");
let fs = require("fs");
let path = require("path");

const productsController = {
  products: (req, res) => {
    if(req.query.name){
      let query = req.query.name.toLowerCase()
      console.log("QUERY****", query);
    db.Product.findAll()
      .then((product) => {
        product = product.filter(function(item){
          let busqueda = item.name.toLowerCase()
          console.log("QUERY BASE DE DATOS****", busqueda);
          if(busqueda.indexOf(query) !== -1)
          return product
        })
        if (product) {
          return res.render("product/product", { products: product });
        }
        return res.render("product/product", {});
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
    }
    db.Product.findAll()
      .then(function (products) {
        res.render("product/product", { products });
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },

  productByQuery: (req, res) => {

    
  },




  productByCategory: (req, res) => {
    db.Product.findAll({ 
    where: {
      category_id: req.params.category
     }
  })
      .then((product) => {
        if (product) {
          return res.render("product/category", { product: product });
        }
        return res.render("product/category", {});
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },


  productDetail: (req, res) => {
    //let products = Product.getProductById(req.params.id);
    db.Product.findByPk(req.params.id)
      .then((product) => {
        if (product) {
          return res.render("product/productDetail", { product: product });
        }
        return res.render("product/productDetail", {});
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },

  productEdition: (req, res) => {
    //let productToEdit = Product.getProductById(req.params.id);
    db.Product.findByPk(req.params.id)
      .then((product) => {
        if (product) {
          db.Category.findAll().then((categories) => {
            if (categories) {
              res.render("product/productEdit", { product, categories });
            }
          });
        }
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },

  create: (req, res) => {
    db.Category.findAll()
      .then((categories) => {
        res.render("product/create", { categories });
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },

  store: (req, res) => {
    db.Product.create({
      name: req.body.name,
      price: req.body.price,
      category_id: 1,
      detail: req.body.detail,
      image: req.files[0].filename,
    });
    res.redirect("/product");
  },
  update: (req, res) => {
    console;
    db.Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category,
        detail: req.body.detail,
      },
      {
        where: {
          id: 99,
        },
      }
    )
      .then((edited) => {
        console.log(edited);
        if (edited[0] > 0) {
          db.Product.findAll().then((products) => {
            //console.log(products);
            res.redirect("/product");
          });
        } else {
          let error = "No se encontro el dato para actualizar";
          res.render("error.ejs", { error });
        }
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });

    //let productos = Product.getProducts();

    // for (let x = 0; x < productos.length; x++) {
    //   if (productos[x].id == req.params.id) {
    //     console.log("**************************************");
    //     console.log(req.body.name, req.body.price);
    //     productos[x].name = req.body.name;
    //     productos[x].price = req.body.price;
    //     productos[x].category = req.body.category;
    //     productos[x].detail = req.body.detail;
    //     productos[x].image = req.files[0].filename;
    //   }
    // }

    //Product.updateJsonProducts(productos);
  },
  delete: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect("/product");
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },
};

module.exports = productsController;
