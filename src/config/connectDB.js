// Get the client
import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic',
});

// A simple SELECT query
connection.query(
  'SELECT * FROM `users`',
  function (err, results, fields) {
    console.log('>>> check mysql');
    console.log(results); // results contains rows returned by server

    let rows = results.map((row) => {return row});
    console.log(rows[0]); // results contains rows returned by server
  }
);

export default connection;
