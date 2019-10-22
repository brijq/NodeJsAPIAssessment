var express = require('express');
var router = express.Router();

require('dotenv').config()

var sqlConnection = require('../config')

/* Add New Student*/
router.post('/student', function (req, res) {
  
    var student = req.body
    sqlConnection.connect();
                            
    sqlConnection.query('INSERT INTO Students SET ?', student , function (error, results, fields) {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            res.send({ error: true, message: error });
        } else {
            res.send({ error: false, data: results, message: 'New Student has been created successfully.' });
        }
    });
});

module.exports = router;