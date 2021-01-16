const db = require("../database/models");
const nodemailer = require("nodemailer");
require("dotenv").config();

const accountController = {
  reset: (req, res) => {
    const TokenGenerator = require("uuid-token-generator");
    const email = req.body.email;
    const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58

    db.User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user) {
          //USER ENCONTRADO
          console.log("USER FOUND, ", user);
          //genero el token
          tokgen.generate();
          console.log("TOKEN: ", tokgen);

          db.PasswordChangeRequest.create({
            hash: tokgen.baseEncoding,
            user_id: user.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }).then(() => {
            console.log("sending Email to, ", user.email);
            sendEmail(user.email, tokgen.baseEncoding);
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

    db.PasswordChangeRequest.findOne({
      where: {
        hash: idConfirmation,
      },
    }).then((confirmation) => {
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
