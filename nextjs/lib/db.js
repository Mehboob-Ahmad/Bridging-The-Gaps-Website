const mysql = require('mysql2/promise');

const {
  MYSQL_HOST = '127.0.0.1',
  MYSQL_PORT = '3306',
  MYSQL_DB = 'bridging_the_gaps',
  MYSQL_USER = 'root',
  MYSQL_PASS = ''
} = process.env;

const pool = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  database: MYSQL_DB,
  user: MYSQL_USER,
  password: MYSQL_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
});

module.exports = pool;
