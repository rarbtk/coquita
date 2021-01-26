//const { User } = require("../models/user");
let db = require("../database/models");
let { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const axios = require("axios");

const userControllers = {
  profile: (req, res) => {
    console.log(req.session);
    db.User.findOne({
      where: {
        email: req.session.user,
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
    const userId = req.session.userId;

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

          //request avatar from gravatar(api)
          const url = `http://127.0.0.1:3000/api/avatar/?email=${req.body.email}`;
          axios(url).then((response) => {
            console.log("getting avatar from gravatar", response);
            if (response) {
              console.log("avatar ", response.hash);
              db.User.create({
                firstName: "",
                lastName: "",
                profile_id: 2,
                email: req.body.email,
                password: hash,
                image: `${response.data.hash}.png`, //default avatar
              })
                .then((user) => {
                  console.log(
                    "*****************************************",
                    user.dataValues.id
                  );
                  req.session.userId = user.dataValues.id;
                  req.session.user = req.body.email;
                  req.session.profile = "customer";
                  req.session.id = res.cookie("userMail", req.body.email, {
                    maxAge: 1800000,
                  }); // cookies 30 minutos
                  res.cookie("userProfile", "customer", { maxAge: 1800000 });

                  res.redirect("/user/profile");
                })
                .catch((error) => {
                  res.render("error", { error: error });
                });
            }
          });
        }
      });
    } else {
      return res.render("user/register", { errors: errors.errors });
    }
  },
  storeAvatar: (req, res) => {
    console.log("llego al post: ", req.files[0].filename);

    db.User.update(
      {
        image: req.files[0].filename,
      },
      {
        where: {
          id: req.session.userId,
        },
      }
    )
      .then(() => {
        res.redirect("/user/profile");
      })
      .catch((error) => {
        console.log(error);
        res.render("error", { error: error });
      });
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
          req.session.userId = user.id;
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
  },
  changePassword: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email: ", email);
    console.log("password: ", password);
    let hash = bcrypt.hashSync(password, 10);

    db.User.update(
      {
        password: hash,
      },
      {
        where: {
          email: email,
        },
      }
    )
      .then((data) => {
        if (data[0] > 0) {
          res.status(200).send({
            status: "ok",
            message: "password modified",
            data: data[0],
          });
        } else {
          res.status(404).send({
            status: "not-found",
            message: "User not found",
            data: data[0],
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          status: "error",
          message: error,
        });
      });
  },
};

module.exports = userControllers;
