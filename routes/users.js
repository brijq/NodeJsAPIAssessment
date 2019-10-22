var express = require('express');
var router = express.Router();

require('dotenv').config()

var sqlConnection = require('../config')

/* Add New Relationship between Teacher and Student in Teacher_Student RelationShip Table */
router.post('/linker', function (req, res) {
  var linker = req.body

  sqlConnection.query('INSERT INTO Teachers_Students SET ?', linker, function (error, results, fields) {
    res.setHeader('Content-Type', 'application/json');
    if (error) {
      res.send({ error: true, message: error });
    } else {
      res.send({ error: false, data: results, message: 'Success' });
    }
  });
});

/* Part 1 As a teacher, I want to register one or more students to a specified teacher. */
router.post('/api/request', function (req, res) {
  var teachersEmail = req.body.teacheremail;

  var query = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE T.email= '" + teachersEmail + "' ";

  sqlConnection.query(query, function (error, results, fields) {
    res.setHeader('Content-Type', 'application/json');
    if (error) {
      res.send({ error: true, message: error });
    } else {
      res.send({ error: false, teacher: teachersEmail, student: results, message: 'Success' });
    }
  });
});

/* Part 2  As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers). */
router.get('/api/commonstudents', function (req, res) {
  var teachersEmail = req.query.teacher;
  
  var i;
  for (i = 0; i < teachersEmail.length; i++) {
    console.log(teachersEmail[i])
    var query = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE T.email= '" + teachersEmail[0] + "' & '" + teachersEmail[i] + "'  ";
    console.log(query)
  }
  sqlConnection.query(query, function (error, results, fields) {
    res.setHeader('Content-Type', 'application/json');
    if (error) {
      res.send({ error: true, message: error });
    } else {
      res.send({ error: false, student: results, message: 'Success' });
    }
  });
});


/* Part 3 As a teacher, I want to suspend a specified student. */
router.post('/api/suspend', function (req, res) {
  // Getting request
  var studentEmail = req.body.student;
  // Setting up query
  var query = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE S.email= '" + studentEmail + "' ";
  var query2 = "UPDATE Students SET suspended = 'Yes' WHERE email = '" + studentEmail + "' ";

  /* Run the second query as expected code is 204 for success */
  sqlConnection.query(query, function (error, results, fields) {
    res.setHeader('Content-Type', 'application/json');
    if (error) {
      res.send({ error: true, message: error });
    } else {
      res.statusCode = 204;
    }
    /* Run the second query as expected code is 204 for success*/
    sqlConnection.query(query2, function (req, res) {
      if (error) {
        res.send({ error: true, message: error });
      } else {
        res.statusCode = 204;
      }
    })
  });
});

/* Part 4 As a teacher, I want to retrieve a list of students who can receive a given notification. */
router.post('/api/retrievefornotifications', function (req, res) {
  // Getting request
  var teachersEmail = req.body.teacher;
  var notification = req.body.notification;

  var emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  var extractStart = notification.match(emailRegex);
  /**
    * Check for students if they are suspended
    * Check for students only if they are being registered with the teacher
  */
  var queryToCheckRegisteredWithTeacherandNotSuspended = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE T.email= '" + teachersEmail + "' AND S.suspended = 'No' AND S.email = '" + extractStart[0] + "' AND '" + extractStart[1] + "'  ";

  sqlConnection.query(queryToCheckRegisteredWithTeacherandNotSuspended, function (error, results, fields) {
    res.setHeader('Content-Type', 'application/json');
    if (error) {
      res.send({ error: true, message: error });
    } else {
      res.send({ error: false, students: results });
    }
  });
});


module.exports = router;
