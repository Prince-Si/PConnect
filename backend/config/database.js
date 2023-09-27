const mysql = require('mysql2'); // Use the mysql2 package


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Root123',
    database: 'PConnect',
  });

  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err);
    } else {
      console.log('Connected to the database');
    }
  });


  db.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      mobile_no VARCHAR(20) NOT NULL,
      usertype VARCHAR(30) NOT NULL
    );
  `, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully or already exists.');
    }
    
  });

module.exports = db;

/*
CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  mobile_no VARCHAR(20) NOT NULL
);
*/