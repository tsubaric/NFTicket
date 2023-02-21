const mysql = require("mysql");
require("dotenv/config");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
