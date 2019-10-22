# NodeJsAPIAssessment

## Background
Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Prerequistes
### If you are running via Local Machine Method
1. Please ignore app.yaml as this file is meant for Google Cloud App Engine Deploy File 

2. Please ignore Dockerfile and .dockerignore as this file is meant for Google Cloud Cloud Run Deploy File

3. Please ignore .gcloudignore file as this file is meant for Google Cloud version of .gitignore file

4. Please remember to include in Headers [{"key":"Content-Type","value":"application/json","description":""}] when perform Post APIS

## Before You Begin (Important)
The following SQL Database is hosted in Google Cloud Platform using CloudSQL.

1. These are the following information in the Student Table

```
+----+--------------+------------------------+-----------+
| id | name         | email                  | suspended |
+----+--------------+------------------------+-----------+
|  1 | StudentBeta  | studentBeta@gmail.com  | No        |
|  2 | StudentBetty | studentBetty@gmail.com | No        |
|  3 | StudentAnker | studentAnker@gmail.com | No        |
|  4 | StudentJon   | studentjon@gmail.com   | No        |
|  5 | StudentHon   | studenthon@gmail.com   | Yes       |
|  6 | studentMary  | studentmary@gmail.com  | Yes       |
+----+--------------+------------------------+-----------+
```

2. These are the following information in the Teachers Table

```
+----+----------------+--------------------------+
| id | name           | email                    |
+----+----------------+--------------------------+
|  1 | TeacherAndy    | teacherAndy@gmail.com    |
|  2 | TeacherAlan    | teacherAlan@gmail.com    |
|  3 | TeacherHeather | teacherHeather@gmail.com |
|  4 | TeacherKate    | teacherKate@gmail.com    |
|  5 | TeacherKen     | teacherKen@gmail.com     |
|  6 | teacherHoly    | teacherHoly@gmail.com    |
+----+----------------+--------------------------+
```

3. These are the following information in the Teachers_Students Table
```
+-----------+-----------+
| teacherid | studentid |
+-----------+-----------+
|         1 |         3 |
|         1 |         2 |
|         4 |         2 |
|         5 |         1 |
|         5 |         2 |
|         5 |         3 |
|         5 |         4 |
|         5 |         5 |
+-----------+-----------+
```

## Steps to access this project ( Two Methods )
### Hosted in Google Cloud Platform using App Engine ( Highly Recommended )

1. Just navigate to https://brijqtify.appspot.com

2. The following apis do just replace http://localhost:3000 to https://brijqtify.appspot.com
   * E.g. http://localhost:3000/students/student to https://brijqtify.appspot.com/students/student


### Local Machine Method ( Second Method )
1. Run through your local machine (Please note: I will need your ip address of the machine you are running in order to connect to mySQL Database as the SQL instance is running in Google Cloud Platform for security purposes)

2. git clone this project

3. cd /to/your/path

4. npm install ( please check permission as it may vary )

5. npx nodemon or npm install

6. localhost:3000

7. You may use postman and run

## User stories

### Add a student

* Endpoint: `POST /students/student`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 200
* Request body example:

```
{
  "id": "1"
  "name": "studentName"
  "email": "studentName@gmail.com"
 }
```

### Add a teacher

* Endpoint: `POST /teachers/teacher`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 200
* Request body example:

```
{
  "id": "1"
  "name": "teacherName"
  "email": "teacherName@gmail.com"
 }
```

### Add a linker relationship table

* Endpoint: `POST /users/linker`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 200
* Request body example:

```
{
  "teacherid": "1"
  "studentid": "3"
 }
```

### 1. As a teacher, I want to register one or more students to a specified teacher.
A teacher can register multiple students. A student can also be registered to multiple teachers.

http://localhost:3000/users/api/register 

* Endpoint: `POST /users/api/register`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 204
* Request body example:
```
{
  "teacher": "teacherken@gmail.com"
  "students":
    [
      "studentjon@gmail.com",
      "studenthon@gmail.com"
    ]
}
```

### 2. As a teacher, I want to retrieve a list of students common to a given list of teachers (i.e. retrieve students who are registered to ALL of the given teachers).

* Endpoint: `GET /users/api/commonstudents`
* Success response status: HTTP 200
* Request example 1: `GET /api/commonstudents?teacher=teacherken%40gmail.com`
* Success response body 1:
```
{
  "students" :
    [
      "commonstudent1@gmail.com", 
      "commonstudent2@gmail.com",
      "student_only_under_teacher_ken@gmail.com"
    ]
}
```
* Request example 2: `GET  /users/api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherKen%40gmail.com`
* Success response body 2:
```
{
  "students" :
    [
      "commonstudent1@gmail.com", 
      "commonstudent2@gmail.com"
    ]
}
```


### 3. As a teacher, I want to suspend a specified student.

* Endpoint: `POST /users/api/suspend`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 204
* Request body example:
```
{
  "student" : "studentmary@gmail.com"
}
```

### 4. As a teacher, I want to retrieve a list of students who can receive a given notification.

* the teacher who is sending the notification, and
* the text of the notification itself.

To receive notifications from e.g. 'teacherKen@gmail.com', a student:
* MUST NOT be suspended,
* AND MUST fulfill *AT LEAST ONE* of the following:
    1. is registered with “teacherken@gmail.com"
    2. has been @mentioned in the notification

The list of students retrieved should not contain any duplicates/repetitions.

* Endpoint: `POST /users/api/retrievefornotifications`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 200
* Request body example 1:
```
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! @studentBetty@gmail.com @studenthon@gmail.com"
}
```
* Success response body 1:
```
{
  "recipients":
    [
      "studentBetty@gmail.com",
      "studentAnker@gmail.com", 
      "studenthon@gmail.com"
    ]   
}
```
In the example above, studentBetty@gmail.com and studentmiche@gmail.com can receive the notification from teacherken@gmail.com, regardless whether they are registered to him, because they are @mentioned in the notification text. studenthon@gmail.com however, has to be registered to teacherKen@gmail.com.
* Request body example 2:
```
{
  "teacher":  "teacherKen@gmail.com",
  "notification": "Hey everybody"
}
```
* Success response body 2:
```
{
  "recipients":
    [
      "studenthon@gmail.com"
    ]   
}
```


