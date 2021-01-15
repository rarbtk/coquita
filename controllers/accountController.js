const db = require("../database/models");
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
};

module.exports = accountController;
