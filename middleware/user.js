const fs = require("fs");
const path = require("path");
const userFilePath = path.join(__dirname, "../data/users.json");

const userMiddleware = {
  storeUser: (user) => {
    let users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

    let newUser = {
      name: "",
      email: user.email,
      password: user.password,
      admin: false,
    };
    users.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(users));
  },
};

module.exports = userMiddleware;
