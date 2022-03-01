var express = require('express');
var router = express.Router();
var titletext = process.env.TITLE

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: titletext });
});

module.exports = router;
