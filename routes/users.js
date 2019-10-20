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

// Creation of Teacher_Student
router.post('/linker', function (req, res) {

  var linker = req.body

  db.query('INSERT INTO Teachers_Students SET ?', linker, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'Success' });
  });
});

// Part 1 As a teacher, I want to register one or more students to a specified teacher.
router.post('/api/request', function (req, res) {

  var teachersEmail = req.body.teacheremail;
  console.log(teachersEmail)

  var query = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE T.email= '" + teachersEmail + "' ";

  db.query(query, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, teacher: teachersEmail, student: results, message: 'Success' });
  });
});

//Part 2  As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).
router.get('/api/commonstudents', function (req, res) {

  var teachersEmail = req.query.teacher;
  var i;
  for (i = 0; i < teachersEmail.length; i++) {
    console.log(teachersEmail[i])
    var query = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE T.email= '" + teachersEmail[0] + "' & '" + teachersEmail[i] + "'  ";
    console.log(query)
  }
  db.query(query, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, student: results, message: 'Success' });
  });
});


// Part 3 As a teacher, I want to suspend a specified student.
router.post('/api/suspend', function (req, res) {
  // Getting request
  var studentEmail = req.body.student;
  // Setting up query
  var query = "SELECT T.*, S.* FROM Teachers_Students as T_S JOIN Teachers as T ON T_S.teacherid = T.id JOIN Students as S ON T_S.studentid = S.id WHERE S.email= '" + studentEmail + "' ";
  var query2 = "UPDATE Students SET suspended = 'Yes' WHERE email = '" + studentEmail + "' ";
  console.log(query2)

  db.query(query, function (error, results, fields) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 204;
    if (error) throw error;
    else if (studentEmail === undefined) {
      response.end();
    }
    res.send({ error: false, message: 'Student Successfully Suspended' });
    db.query(query2, function (req, res) {
      res.statusCode = 204;
    })
  });
});

// Part 4 As a teacher, I want to retrieve a list of students who can receive a given notification.
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
  console.log(queryToCheckRegisteredWithTeacherandNotSuspended)

  db.query(queryToCheckRegisteredWithTeacherandNotSuspended, function (error, results, fields) {
    if (error) throw error;
    res.send({ error: false, students: results });
  });
});


module.exports = router;
