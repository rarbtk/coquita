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

  profile: (req, res) => {
    console.log(req.params.id);
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        console.log("user found: ", user.firstName);
        res.render("user/profile", { user: user });
      })
      .catch((error) => {
        res.render("error", { error: error });
      });
    //
  },


  storeProfile: (req, res) => {
    //console.log(req.session);
    const userId = req.params.id;

    //hashear nueva pass(si la hay)
    db.User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: userId,
        },
      }
    ).then(() => {
      res.redirect("/user/profile");
    });
  },


  profilebyID: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        res.redirect("../user/profile", { user: user });
      })
      .catch((error) => {
        res.render("error", { error: error });
      });
  },

  deleteUser: (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
        res.redirect("/administracion");

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
