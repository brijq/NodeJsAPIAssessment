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
    socketPath: process.env.DB_SOCKETPATH,
})

// Add a new Teacher 
router.post('/teacher', function (req, res) {
  
    var teacher = req.body
    db.connect();
                            
    db.query('INSERT INTO Teachers SET ?', teacher , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Teacher has been created successfully.' });
    });
});

module.exports = router;