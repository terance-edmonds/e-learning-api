const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.MYSQL_DB,
    connectionLimit: 10
  });

// Attempt to catch disconnects 
pool.on('connection', function (connection) {
  console.log('DB Connected');

  connection.on('error', function (err) {
    if(err.code == "ECONNRESET"){console.log('DB disconnected')}
    else{console.error('MySQL error', err.code);}
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

 module.exports = pool;