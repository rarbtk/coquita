const express = require("express");
const path = require("path");
const app = express();

app.get("/", function (req, res) {
  let file = path.resolve("views/home.html");
  return res.sendFile(file);
});

app.get("/home", function (req, res) {
  let file = path.resolve("home.html");
  return res.sendFile(file);
});

app.get("/login", function (req, res) {
  let file = path.resolve("views/login.html");
  return res.sendFile(file);
});

app.get("/productCart", function (req, res) {
  let file = path.resolve("views/productCart.html");
  return res.sendFile(file);
});

app.get("/productDetail", function (req, res) {
  let file = path.resolve("views/productDetail.html");
  return res.sendFile(file);
});

app.get("/register", function (req, res) {
  let file = path.resolve("views/register.html");
  return res.sendFile(file);
});

app.get("/abm-products", function (req, res) {
  let file = path.resolve("views/abm-products.html");
  return res.sendFile(file);
});

app.get("*", function (req, res) {
  if (req.url.includes(".")) {
    let file = path.resolve("public" + req.url);
    res.sendFile(file);
  }
  let images;
});

app.listen(3002, () => {
  console.log("##############################");
  console.log("Proyecto Coquita is running :)");
  console.log("##############################");
});
