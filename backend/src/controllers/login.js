const db = require('../../config/database');
const userModel = require('../models/user');

exports.apilogin = (req, res) => {
  const { email, password } = req.body;
  console.log('apilogin function called');

  userModel.findByEmailAndPassword(email, password, (err, results) => {
    if (err) {
      console.error('Login query error:', err);
      res.status(500).json({ error: 'Login failed' });
    } else {
      if (results.length === 1) {
        // Assuming that 'usertype' is a field in the database
        const usertype = results[0].usertype;
        const username= results[0].username;
        const email = results[0].email;
        console.log(usertype);
        console.log(username);
        console.log(email);

        res.json({ message: 'Login successful', route: '/about', usertype, username, email });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
};


exports.register = (req, res) => {
  console.log('register function is called.');
  const { username, email, password, mobile_no, usertype } = req.body;

  if (!username || !email || !password || !mobile_no || !usertype) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the email already exists in the database
  db.query('SELECT * FROM accounts WHERE email = ?', [email], (err, existingUsers) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Registration failed' });
    }

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Insert new user into the database
    db.query(
      'INSERT INTO accounts (username, email, password, mobile_no, usertype) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, mobile_no, usertype],
      (err, insertResult) => {
        if (err) {
          console.error('Registration error:', err);
          return res.status(500).json({ error: 'Registration failed' });
        }

        if (insertResult.affectedRows === 1) {
          return res.status(200).json({ message: 'Registration successful' });
        } else {
          return res.status(500).json({ error: 'Registration failed' });
        }
      }
    );
  });
};

exports.usernameavailability = (req, res) => {
  const username = req.params.username;

  // Check if the username exists in the database
  db.query('SELECT * FROM accounts WHERE username = ?', [username], (err, existingUsers) => {
    if (err) {
      console.error('Error checking username availability:', err);
      return res.status(500).json({ error: 'Error checking username availability' });
    }

    res.json({ available: existingUsers.length === 0 });
  });
};

exports.email_availability = (req, res) => {
  const email = req.params.email;

  // Check if the email exists in the database
  db.query('SELECT * FROM accounts WHERE email = ?', [email], (err, existingUsers) => {
    if (err) {
      console.error('Error checking email availability:', err);
      return res.status(500).json({ error: 'Error checking email availability' });
    }

    res.json({ available: existingUsers.length === 0 });
  });
};
