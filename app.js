var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var productMainRouter = require("./routes/productMain");
var adminRouter = require("./routes/adminRouter");
var productCartRouter = require("./routes/productCart");
var productDetailRouter = require("./routes/productDetail");
var edicionRouter = require("./routes/edicionRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("dotenv").config();

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/administracion", adminRouter);
app.use("/editProduct", productMainRouter);
app.use("/productMain", productMainRouter);
app.use("/productDetail", productDetailRouter);
app.use("/productCart", productCartRouter);
app.use("/edicion", edicionRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
