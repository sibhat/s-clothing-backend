require("dotenv").config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let api = require("./api");
// const passport = require("passport");
const googleAuth = require("./auth/GoogleAuth20");
const app = express();


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use("/api", api);
app.use("/auth", googleAuth);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next();
// });

// error handler
app.use(function(err, req, res, next) {
  if(!err) next();
  // render the error page
  res.status(err.status || 500);
  res.json({'error': err.message || "error msg"});
});

let port = process.env.PORT || '8000';

app.listen(port,() =>{
  console.log("Server is listening on port "+ port);
});
