const db = require("../database/models");
let fs = require("fs");
let path = require("path");

const adminController = {
  products: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        db.User.findAll()
        .then(function(users){
        res.render("admin/administracion", { products: products, users: users });
      })
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });
  },

  profilebyID: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        console.log("user found: ", user.firstName);
        res.render("../user/profile", { user: user });
      })
      .catch((error) => {
        res.render("error", { error: error });
      });
    //
  },

  delete: (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect("/administracion");
      })
      .catch((error) => {
        res.render("error.ejs", { error });
      });

  },

  delete: (req, res) => {
    let productos = Product.getProducts();
    console.log(productos);
    for (let x = 0; x < productos.length; x++) {
      if (productos[x].id == req.params.id) {
        console.log("product found. Removing item ", productos[x]);
        //    productos.splice(x);
        console.log("items luego de borrar 1: ", productos);
      }
    }

    Product.updateJsonProducts(productos);
    res.render("product/product.ejs", { products: productos });
  },
};

module.exports = adminController;
