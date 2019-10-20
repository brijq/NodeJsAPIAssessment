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

// Add a new Student
router.post('/student', function (req, res) {
  
    var student = req.body
    db.connect();
                            
    db.query('INSERT INTO Students SET ?', student , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Student has been created successfully.' });
    });
});

module.exports = router;