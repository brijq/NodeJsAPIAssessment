var express = require('express');
var router = express.Router();

require('dotenv').config()

const mysql = require('promise-mysql');

let pool;
const createPool = async () => {
  pool = await  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASES,
    port: process.env.DB_PORT,
    socketPath: `/cloudsql/brijqtify:asia-southeast1:nodejs`,
  })
};

createPool();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Node Js API Assessment' });
});

router.get ('/testconnect', function(req, res, next) {
  if( pool != null){
    res.send('connect success')
  } else {
    res.send('failed')
  }
});

module.exports = router;
