const userMiddleware = require("../middleware/user");

const userControllers = {
  storeUser: (req, res) => {
    userMiddleware.storeUser(req.body);
    res.send("register success");
  },
};

module.exports = userControllers;
