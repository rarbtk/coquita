// api de registracion del usuario
let db = require("../../database/models");
const bcrypt = require("bcrypt");
let { validationResult } = require("express-validator");
const axios = require("axios");

const userController = {
  async registerUser(req, res) {
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
                      user,
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
};

module.exports = userController;
