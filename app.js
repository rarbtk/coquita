var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");

// session
const session = require("express-session");

// cookies middleware
const rememberMeMiddleware = require("./middleware/rememberMeMiddleware");

// rutas
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var productRouter = require("./routes/product");
var cartRouter = require("./routes/cart");
var adminRouter = require("./routes/admin");
var accountRouter = require("./routes/account");

//apis
const paymentRouter = require("./routes/api/payments");
const avatarRouter = require("./routes/api/avatar");
const userApiRouter = require("./routes/api/user");
const cartApiRouter = require("./routes/api/cart");
const productApiRouter = require("./routes/api/product");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(session({ secret: "coquita" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();
app.use(function (req, res, next) {
  if (req.session.user) {
    res.locals.usuario = req.session.user;
    res.locals.profile = req.session.profile;
    res.locals.userId = req.session.userId;
  }
  return next();
});
app.use(rememberMeMiddleware);
app.use("/", indexRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/account", accountRouter);
app.use("/cart", cartRouter);
app.use("/administracion", adminRouter);
//apis
app.use("/api/payments", paymentRouter);
app.use("/api/avatar", avatarRouter);
app.use("/api/users", userApiRouter);
app.use("/api/cart", cartApiRouter);
app.use("/api/product", productApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render("not-found");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
