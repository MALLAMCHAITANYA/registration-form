// Connects our Node.js server to MySQL (MySQL Workbench uses the same database)

const mysql = require('mysql2/promise');
const config = require('../config');

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

module.exports = pool;
