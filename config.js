require('dotenv').config()
const mysql = require('mysql');

var sqlConnection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASES,
    port: process.env.SQL_PORT,
    socketPath: `/cloudsql/brijqtify:asia-southeast1:nodejs`,
});

module.exports = sqlConnection;