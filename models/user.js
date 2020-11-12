const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const userFilePath = path.join(__dirname, "../data/users.json");

const user = {
  storeUser: (user) => {
    let users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

    let newUser = {
      name: "",
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      admin: false,
    };
    users.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(users));
  },
  getUserByEmail: (email) => {
    console.log("executing getUserByEmail method");
    let users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
    let user = users.find(function (item) {
      return item.email == email;
    });
    console.log("USER: ", user);
    return user;
  },
};

module.exports = { user };
