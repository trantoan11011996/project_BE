var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const adminRouter = require("./routes/adminRouter");
const { errHandle } = require("./middleware/middleware");
const { getAllMap } = require("./controller/mapController");

const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

connectDB();

// api document swagger
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Keyboard-shop API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

var app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/testpaypal", (req, res) => {
  res.render("paypal.ejs");
});
app.get("/api/maps", getAllMap);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(errHandle);

module.exports = app;
