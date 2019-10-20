require('dotenv').config()
const mysql = require('mysql');

var sqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASES,
    port: process.env.DB_PORT,
    //socketPath: `/cloudsql/brijqtify:asia-southeast1:nodejs`,
});

module.exports = sqlConnection;