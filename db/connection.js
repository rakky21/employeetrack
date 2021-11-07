const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // your mysql username,
    user: 'root',
    // your mysql password
    password: 'Ozwald2021!',
    database: 'employeetrack'
  },
);

module.exports = db;