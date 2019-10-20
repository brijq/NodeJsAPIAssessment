var express = require('express');
var router = express.Router();

require('dotenv').config()

var mysql = require('mysql');
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASES,
    port: process.env.DB_PORT,
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Node Js API Assessment' });
});

router.get ('/testconnect', function(req, res, next) {
  if( db != null){
    res.send('connect success')
  } else {
      res.send('failed')
  }
});

module.exports = router;
