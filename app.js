var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var pg = require('pg');
pg.defaults.ssl = true;

var indexRouter = require('./routes/index');

var app = express();


app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json());

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://dhsgikqbiryffp:15a2dce54278dc5411abfa654a7cc296b0d41fae3f2de48ba02481644927de9d@ec2-54-225-72-238.compute-1.amazonaws.com:5432/d5udu3publejm5');

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
