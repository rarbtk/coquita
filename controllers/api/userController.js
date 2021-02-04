// api de registracion del usuario
let db = require("../../database/models");
const bcrypt = require("bcrypt");
let { validationResult } = require("express-validator");
const axios = require("axios");

const userController = {
  async register(req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((email) => {
        console.log(email);
        if (email) {
          //if user already exist
          return res.status(200).send({
            errors: [{ msg: "La cuenta/email ya existe en la DB " }],
          });
        } else {
          let hash = bcrypt.hashSync(req.body.password, 10);
          console.log("*******************************");
          console.log(hash);
          console.log("*******************************");

          //request to get avatar from gravatar(api)
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
                  req.session.userId = user.dataValues.id;
                  req.session.user = req.body.email;
                  req.session.profile = "customer";
                  req.session.id = res.cookie("userMail", req.body.email, {
                    maxAge: 1800000,
                  });
                  res.status(201).send({
                    meta: {
                      status: 201,
                      message: "user registration successfully",
                    },
                    data: {
                      user: user,
                    },
                  });
                })
                .catch((error) => {
                  res.status(500).send({ error: error });
                });
            }
          });
        }
      });
    } else {
      return res.status(200).send({ errors: errors.errors });
    }
  },
  login: (req, res) => {
    db.User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          req.session.user = user.email;
          req.session.userId = user.id;
          req.session.profile = user.profile_id;
          return res.status(200).send({
            message: "login successfully",
          });
        } else {
          //Incorrect password
          return res.status(403).send({
            message: "wrong password",
          });
        }
      } else {
        // user not exist into database
        return res.status(403).send({
          message: "wrong password",
        });
      }
    });
  },
  profile: (req, res) => {
    console.log(req.session);
    db.User.findOne({
      where: {
        email: req.session.user,
      },
    })
      .then((user) => {
        console.log("user found: ", user.firstName);
        res.status(200).send({
          meta: {
            status: 200,
            message: "",
            data: {
              profile: user,
            },
          },
        });
      })
      .catch((error) => {
        res.status(500).send({ error: error });
      });
  },
  // get all users
  users: (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    db.User.findAll({
      limit: limit,
      offset: offset,
    })
      .then((users) => {
        return res.status(200).send({
          meta: {
            status: 200,
            count: users.length,
            limit: limit,
            offset: offset,
            url: "/api/users/",
          },
          data: {
            users: users,
          },
        });
      })
      .catch((error) => {
        res.status(500).send({
          error: error,
          message: "Ups! ocurrió un error al intentar conectarse con la BD.",
        });
      });
  },
  // get by userId - TO-DO
  user: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        if (user) {
          return res.status(200).send({
            meta: {
              status: 200,
              //count: user.length || 0,
              url: `/api/users/${req.params.id}`,
            },
            data: {
              user: user,
            },
          });
        } else {
          return res.status(404).send({
            meta: {
              status: 200,
              //count: user.length || 0,
              url: `/api/users/${req.params.id}`,
            },
            data: {},
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          error: error,
          message: "Ups! ocurrió un error al intentar conectarse con la BD.",
        });
      });
  },
};

module.exports = userController;
