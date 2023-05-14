const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const config = require('../config/index');

// Email validation regular expression
// The email address can contain alphanumeric characters, special characters (.!#$%&'*+/=?^_{|}~-), and dots (.`) within the local part.
// The local part must be followed by the @ symbol.
// The domain part can contain alphanumeric characters and hyphens (-).
// The domain can have multiple segments separated by dots (.).
// The pattern allows for top-level domains (TLDs) with multiple segments, such as .co.uk.
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

router.post('/', (req, res) => {
  const { email, password } = req.body;

  console.log('got heereee',email, password);
  // Check if required fields are present
  if (!email || !password) {
    return res.status(400).json({
      message: 'Missing email or password'
    });
  }

  // Check if email is a valid email address
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email address'
    });
  }

  // Find the user in the database by email
  db.query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      // Check if user exists
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      const user = result.rows[0];
      const { salt, password: hashedPassword } = user;

      // Hash the entered password with the user's salt
      const hmac = crypto.createHmac('sha512', salt);
      hmac.update(password);
      const hashedEnteredPassword = hmac.digest('hex');

      // Compare the hashed entered password with the stored hashed password
      if (hashedEnteredPassword !== hashedPassword) {
        return res.status(401).json({
          message: 'Invalid password'
        });
      }

      // Password is correct, return success response
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        }
      });
    })
    .catch((error) => {
      console.error('Database error:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    });
});

module.exports = router;
