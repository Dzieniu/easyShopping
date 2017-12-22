var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var User = mongoose.model('User');
var Meal = mongoose.model('Meal');
var mongodb = require('mongodb');
var mailer = require('../mailing/custom-mailer.js');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.get('/mealslist/:username', function(req,res,next){
  Meal.find({'username': req.params.username}, function(err, meals){
    if(err){return next(err); }
    res.json(meals);
  });
});

router.post('/mealslist', function(req,res,next){
  var meal = new Meal(req.body);

  req.checkBody("name", "Wprowadz nazwę posiłku").exists().notEmpty();
  var errors = req.validationErrors();

  if (errors) {
      res.status(403).send('Wprowadz nazwę posiłku');
  } else {
      meal.save(function(err,meals){
        if(err){return next(err);}
        res.json(meal);
      });
  }

});

router.delete('/mealslist/:id', function(req,res,next){
  Meal.findById(req.params.id,function(err,meal){
    if(err) {return next(err);}
    if(!meal) {return res.send(404);}
    meal.remove(function(err){
      if(err) {return handleError(res,err);}
      return res.send(204);
    });
  });
});

router.put('/mealslist/:id', function(req,res,next){
  var newName=req.body.name;
  var newProducts=req.body.products;
  Meal.findById(req.params.id,function(err,meal){
    meal.updateMeal(newName,newProducts,function(err,meals){
      res.json(meals);
    })
  })
})

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.mail){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  user.mail=req.body.mail;

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


router.post('/mail/plan', function(req,res,next){
  mailer.sendPlan(req.body.email,req.body.HTMLString,function(){
    res.json("poszlo");
  })
})
module.exports = router;
