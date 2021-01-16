const avatarControllers = {
  getAvatar: (req, res) => {
    /* 
        request example http://www.gravatar.com/avatar/HASH?d=identicon&s=200
        PARAMS:
        HASH -> leyendo vi que generan un hash a partir del email del user!
        s -> tamaño de la imagen
        Debemos hacer el get a la api de gravatar y bajarla al server la img calculo....
        */
    const fs = require("fs");
    const fetch = require("node-fetch");
    var md5 = require("md5");

    const email = req.query.email;

    const hash = md5(email);
    const url = `http://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;

    console.log(url);

    download();

    async function download() {
      const response = await fetch(url);
      const buffer = await response.buffer();
      fs.writeFile(`./public/images/avatars/${hash}.png`, buffer, () =>
        res.json({ hash: hash })
      );
    }
  },
};

module.exports = avatarControllers;
