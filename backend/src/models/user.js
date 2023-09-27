// models/user.js

const db = require('../../config/database');

exports.findByEmailAndPassword = (email, password, callback) => {
  db.query(
    'SELECT * FROM accounts WHERE email = ? AND password = ?',
    [email, password],
    callback
  );
};


exports.updateUser = (newMobileno,email, callback) => {
  const sql = 'UPDATE accounts SET mobile_no=? WHERE email = ?';
  db.query(sql, [newMobileno, email], (err, results) => {
    if (err) {
      console.error('Error updating password:', err);
      callback(err, null);
    } else {
      callback(null, 'Password updated successfully');
    }
  });
}