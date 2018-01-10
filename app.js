var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
require('./models/Users');
require('./models/Meals');
require('./models/Plan');


require('./config/passport');
var routes  = require('./routes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var validator = require('express-validator');

var app = express();

// mongoose.connect('mongodb://localhost/easyshopping');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_8qmz9flv:sss18gskc6sm8lctdknj3qg6a@ds163020.mlab.com:63020/heroku_8qmz9flv');

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
app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(validator());




app.use('/', dbRoutes);

app.get('/', routes.index);
app.get('/favicon.ico' , function(req , res){/*code*/});

app.get('/:filename', routes.pages);


app.listen(3000);

module.exports = app;
