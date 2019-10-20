# NodeJsAPIAssessment

## Background
Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Steps to access this project
1. Run through your local machine (Please note: I will need your ip address of the machine you are running in order to connect to mySQL Database as the SQL instance is running in Google Cloud Platform for security purposes)

2. git clone this project

3. cd /to/your/path

4. npm install ( please check permission as it may vary )

5. npx nodemon

6. localhost:3000

7. You may use postman and run

## User stories

### Add a student

http://localhost:3000/students/student

* Endpoint: `POST /api/register`
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

http://localhost:3000/teachers/teacher

* Endpoint: `POST /api/register`
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

http://localhost:3000/users/linker

* Endpoint: `POST /api/register`
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

* Endpoint: `POST /api/register`
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


http://localhost:3000/users/api/commonstudents

* Endpoint: `GET /api/commonstudents`
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
* Request example 2: `GET /api/commonstudents?teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com`
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


http://localhost:3000/users/api/suspend

* Endpoint: `POST /api/suspend`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 204
* Request body example:
```
{
  "student" : "studentmary@gmail.com"
}
```

### 4. As a teacher, I want to retrieve a list of students who can receive a given notification.

http://localhost:3000/users/api/retrievefornotifications

* the teacher who is sending the notification, and
* the text of the notification itself.

To receive notifications from e.g. 'teacherken@gmail.com', a student:
* MUST NOT be suspended,
* AND MUST fulfill *AT LEAST ONE* of the following:
    1. is registered with “teacherken@gmail.com"
    2. has been @mentioned in the notification

The list of students retrieved should not contain any duplicates/repetitions.

* Endpoint: `POST /api/retrievefornotifications`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 200
* Request body example 1:
```
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
}
```
* Success response body 1:
```
{
  "recipients":
    [
      "studentbob@gmail.com",
      "studentagnes@gmail.com", 
      "studentmiche@gmail.com"
    ]   
}
```
In the example above, studentagnes@gmail.com and studentmiche@gmail.com can receive the notification from teacherken@gmail.com, regardless whether they are registered to him, because they are @mentioned in the notification text. studentbob@gmail.com however, has to be registered to teacherken@gmail.com.
* Request body example 2:
```
{
  "teacher":  "teacherken@gmail.com",
  "notification": "Hey everybody"
}
```
* Success response body 2:
```
{
  "recipients":
    [
      "studentbob@gmail.com"
    ]   
}
```


