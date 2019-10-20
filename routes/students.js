var express = require('express');
var router = express.Router();

require('dotenv').config()

const mysql = require('promise-mysql');
let pool;
const db = async () => {
  pool = await  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASES,
    port: process.env.DB_PORT,
    socketPath: `/cloudsql/brijqtify:asia-southeast1:nodejs`,
  })
};

db();

// Add a new Student
router.post('/student', function (req, res) {
  
    var student = req.body
    pool.connect();
                            
    pool.query('INSERT INTO Students SET ?', student , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Student has been created successfully.' });
    });
});

module.exports = router;