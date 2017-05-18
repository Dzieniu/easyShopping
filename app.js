var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
require('./models/Users');
require('./models/Meals');
require('./config/passport');
var routes  = require('./routes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

mongoose.connect('mongodb://localhost/easyshopping');
// mongoose.connect('mongodb://heroku_8qmz9flv:sss18gskc6sm8lctdknj3qg6a@ds163020.mlab.com:63020/heroku_8qmz9flv');

var dbRoutes = require('./routes/dbroutes');


// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', dbRoutes);

app.get('/', routes.index);


app.get('/:filename', routes.pages);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
