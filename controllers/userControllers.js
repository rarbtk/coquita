//const { User } = require("../models/user");
let db = require("../database/models");
let { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

const userControllers = {
  storeUser: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((email) => {
        console.log(email);
        if (email) {
          return res.render("user/register", {
            errors: [{ msg: "La cuenta/email ya existe en la DB " }],
          });
        } else {
          console.log("PASSWORD:" + req.body.password);
          let hash = bcrypt.hashSync(req.body.password, 10);
          console.log("*******************************");
          console.log(hash);
          console.log("*******************************");
          db.User.create({
            firstName: "",
            lastName: "",
            profile_id: 2,
            email: req.body.email,
            password: hash,
            image: "/images/avatar/default-avatar-male.png", //default avatar
          });
          req.session.user = req.body.email;
          req.session.profile = "customer";
          res.cookie("userMail", req.body.email, { maxAge: 1800000 }); // cookies 30 minutos
          res.cookie("userProfile", "customer", { maxAge: 1800000 });

          res.redirect("/");
        }
      });
    } else {
      return res.render("user/register", { errors: errors.errors });
    }
  },
  login: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        let pass = user.password;
        console.log(user.password);
        console.log(req.body.password);
        console.log(bcrypt.compareSync(req.body.password, pass));
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.user = user.email;
          req.session.profile = user.profile_id;
          console.log("rememberCoquita");
          if (req.body.rememberMe != undefined) {
            res.cookie("userMail", user.email, { maxAge: 1800000 }); // cookies 30 minutos
            res.cookie("userProfile", user.profile_id, {
              maxAge: 1800000,
            });
          }
          console.log("***********************");
          console.log("Session: ", req.session.user, req.session.profile);
          res.redirect("/");
        } else {
          //Incorrect password
          return res.render("user/login", {
            errors: [{ msg: "Verifica la password y intenta nuevamente" }],
          });
        }
      } else {
        // user not exist into database
        return res.render("user/login", {
          errors: [{ msg: "La cuenta/email es inexistente " }],
        });
      }
    });

    // const user_found = User.getUserByEmail(email);
    // if (user_found) {
    //   console.log("USUARIO ENCONTRADO: ", user_found);
    //   // Check password
    //   if (bcrypt.compareSync(password, user_found.password)) {
    //     //password OK
    //     req.session.user = user_found.email;
    //     req.session.category = user_found.category;
    //     console.log("rememberCoquita");
    //     if (req.body.rememberMe != undefined) {
    //       res.cookie("userMail", user_found.email, { maxAge: 1800000 }); // cookies 30 minutos
    //       res.cookie("userCategory", user_found.category, { maxAge: 1800000 });
    //     }
    //     console.log("***********************");
    //     console.log("Session: ", req.session.user, req.session.category);
    //     res.redirect("/");
    //   } else {
    //     //Incorrect password
    //     return res.render("user/login", {
    //       errors: [{ msg: "Verifica la password y intenta nuevamente" }],
    //     });
    //   }
    // } else {
    //   // retornar error
    //   return res.render("user/login", {
    //     errors: [{ msg: "La cuenta/email es inexistente " }],
    //   });
    // }
  },
};

module.exports = userControllers;
