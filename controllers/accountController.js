const db = require("../database/models");
const nodemailer = require("nodemailer");
const { Op } = require("sequelize");
const moment = require("moment");
require("dotenv").config();

const accountController = {
  reset: (req, res) => {
    const md5 = require("md5");
    const email = req.body.email;

    db.User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user) {
          //USER ENCONTRADO
          console.log("USER FOUND, ", user);
          //genero el hash
          const hash = md5(email + Date.now());

          console.log("HASH: ", hash);

          db.PasswordChangeRequest.create({
            hash: hash,
            user_id: user.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            valid: "true",
          }).then(() => {
            console.log("sending Email to, ", user.email);
            sendEmail(user.email, hash);
            res.render("account/reset-email-confirmation", {
              email: user.email,
            });
          });
        } else {
          res.render("account/account-not-found", { email: email });
        }
      })
      .catch((error) => {
        console.log("ERROR, ", error);
        res.render("error", { error: error });
      });
  },
  resetConfirmation: (req, res) => {
    const idConfirmation = req.query.idConfirmation;
    console.log("DATE - 24 hours: ", moment().subtract(24, "hours").toDate());

    db.PasswordChangeRequest.findOne({
      where: {
        hash: idConfirmation,
        valid: "true",
        createdAt: {
          [Op.gte]: moment().subtract(24, "hours").toDate(), // check if token less than 24 hours
        },
      },
    }).then((confirmation) => {
      console.log(confirmation);
      if (confirmation) {
        console.log(
          "La confirmacion es valida , renderiar vista changePassword ",
          confirmation.user_id
        );
        // Buscar datos del de usuario
        db.User.findOne({
          where: {
            id: confirmation.user_id,
          },
        })
          .then((user) => {
            if (user) {
              //Invalidar hash para que no se pueda accededer nuevamente
              db.PasswordChangeRequest.update(
                {
                  valid: "false",
                },
                {
                  where: {
                    hash: idConfirmation,
                  },
                }
              );

              res.render("account/resetPassword", { user: user });
            }
          })
          .catch((error) => {
            res.render(error, { error });
          });
      } else {
        console.log("Id de confirmacion invalida");
        res.redirect("/");
      }
    });
  },
};

function sendEmail(emailTo, hash) {
  const EMAIL = process.env.EMAIL;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
  const EMAIL_TO = emailTo;
  const HASH = hash;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: EMAIL,
    to: EMAIL_TO,
    subject: "Recuperacion de contraseña - Panaderia Coquita",
    html: `<p>Recuperacion de contraseña</p> 
    <p>Para recuperar la contraseña ingresa <a href="http://localhost:3000/account/reset-email-confirmation?idConfirmation=${HASH}">AQUI</a><p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = accountController;
