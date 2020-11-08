const userMiddleware = require("../middleware/user");

const userControllers = {
  storeUser: (req, res) => {
    //console.log(req.body.email);
    //console.log(body);
    userMiddleware.storeUser(req.body);
    res.send("register success");
  },
};

module.exports = userControllers;
