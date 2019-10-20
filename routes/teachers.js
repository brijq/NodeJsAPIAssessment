var express = require('express');
var router = express.Router();

require('dotenv').config()

var sqlConnection = require('../config')

/* Add New Teacher */
router.post('/teacher', function (req, res) {
  
    var teacher = req.body
                                
    sqlConnection.query('INSERT INTO Teachers SET ?', teacher , function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New Teacher has been created successfully.' });
    });
});

module.exports = router;