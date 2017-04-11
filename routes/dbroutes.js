var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var User = mongoose.model('User');
var Meal = mongoose.model('Meal');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.get('/mealslist/:username', function(req,res,next){
  Meal.find({'username': req.params.username}, function(err, meals){
    if(err){return next(err); }
    res.json(meals);
  });
});

router.post('/mealslist', function(req,res,next){
  var meal = new Meal(req.body);
  meal.save(function(err,meals){
    if(err){return next(err);}
    res.json(meal);
  });
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});


module.exports = router;
