const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const userFilePath = path.join(__dirname, "../data/users.json");

const user = {
  storeUser: (user) => {
    let users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

    let newUser = {
      id: "",
      firstName: "",
      lastName: "",
      category: "",
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      image: "/avatars/default-avatar-male.png",
    };
    users.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(users));
  },
  getUserByEmail: (email) => {
    let users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
    let user = users.find(function (item) {
      return item.email == email;
    });
    return user;
  },
};

module.exports = { User: user };
