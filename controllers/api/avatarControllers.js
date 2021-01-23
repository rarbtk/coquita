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
    //const url = `http://www.avatar.com/avatar/${hash}?d=identicon&s=200`;

    console.log(url);

    download();

    async function download() {
      const response = await fetch(url);
      console.log("fetch response from avatar: ", response.status);

      if (response.status == 200) {
        // get headers from response
        const headers = await response.headers;

        // check if a response is an image(avatar)
        function checkHeader(headers) {
          var image = false;
          headers.forEach(function (val, key) {
            console.log(key + " - " + val);
            if (key == "content-type" && val == "image/png") {
              image = true;
            }
          });
          return image;
        }

        if (checkHeader(headers)) {
          const buffer = await response.buffer();
          fs.writeFile(`./public/images/avatars/${hash}.png`, buffer, () =>
            res.status(201).json({
              hash: hash,
              message: "avatar saved sucessfully ;)",
            })
          );
        } else {
          res.status(500).json({
            message: "error getting image from gravatar.",
            url: url,
          });
        }
      } else {
        res.status(500).json({
          message: "error getting image from gravatar.",
          url: url,
        });
      }
    }
  },
};

module.exports = avatarControllers;
