var express = require('express');
var router = express.Router();

require('dotenv').config()

const mysql = require('promise-mysql');
let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASES,
    port: process.env.DB_PORT,
    socketPath: `/cloudsql/brijqtify:asia-southeast1:nodejs`,
  })
};

createPool();

// Add a new Teacher 
router.post('/teacher', function (req, res) {
  
    var teacher = req.body
    //pool.connect();
                            
    pool.query('INSERT INTO Teachers SET ?', teacher , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Teacher has been created successfully.' });
    });
});

module.exports = router;