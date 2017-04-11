var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/landingPage', function(req, res, next) {
  res.render('landingPage', { title: 'Express' });
});

module.exports = router;
