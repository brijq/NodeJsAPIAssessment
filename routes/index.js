var express = require('express');
var router = express.Router();

require('dotenv').config()

var sqlConnection = require('../config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Node Js API Assessment by Brian Oh' });
});

/* Test Connection From Database */
router.get('/testconnect', function(req, res, next) {
  if( sqlConnection != null){
    res.send('connect success')
  } else {
    res.send('failed')
  }
});

module.exports = router;
