const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const config = require('../config/index');
const moment = require('moment');

// Email validation regular expression
// The email address can contain alphanumeric characters, special characters (.!#$%&'*+/=?^_{|}~-), and dots (.`) within the local part.
// The local part must be followed by the @ symbol.
// The domain part can contain alphanumeric characters and hyphens (-).
// The domain can have multiple segments separated by dots (.).
// The pattern allows for top-level domains (TLDs) with multiple segments, such as .co.uk.
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

router.post('/', (req, res) => {
  const {
    email,
    password
  } = req.body;

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
          message: 'The email or the password are wrong'
        });
      }

      const user = result.rows[0];
      const {
        id,
        salt,
        password: hashedPassword,
        login_attempts,
        last_login_attempt
      } = user;

      // Check if the user has exceeded the maximum login attempts
      if (login_attempts >= config.loginAttempts) {
        // Calculate the time difference in minutes
        const now = moment();
        const lastAttemptTime = moment(last_login_attempt, 'YYYY-MM-DD HH:mm:ss');
        const diffInMinutes = moment.duration(now.diff(lastAttemptTime)).asMinutes();

        // Check if the time difference is less than 30 minutes
        if (diffInMinutes < 30) {
          return res.status(401).json({
            message: 'Maximum login attempts exceeded. Please try again later.'
          });
        } else {
          // Reset the login_attempts field and update the last_login_attempt field
          db.query('UPDATE users SET login_attempts = 0, last_login_attempt = $1 WHERE email = $2', [now, email])
            .catch((error) => {
              console.error('Database error:', error);
            });
        }
      }

      // Hash the entered password with the user's salt
      const hmac = crypto.createHmac('sha512', salt);
      hmac.update(password);
      const hashedEnteredPassword = hmac.digest('hex');

      // Compare the hashed entered password with the stored hashed password
      if (hashedEnteredPassword !== hashedPassword) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query('UPDATE users SET login_attempts = $1, last_login_attempt = $2 WHERE email = $3', [login_attempts + 1, now, email])
          .catch((error) => {
            console.error('Database error:', error);
          });
        return res.status(401).json({
          message: 'The email or the password are wrong'
        });
      }

      // Password is correct, reset the login_attempts field to 0 and update the last_login_attempt field
      const now = moment().format('YYYY-MM-DD HH:mm:ss');
      db.query('UPDATE users SET login_attempts = 0, last_login_attempt = $1 WHERE email = $2', [now, email])
        .catch((error) => {
          console.error('Database error:', error);
        });

      // generate token
      payload = {
        userId: id,
        userEmail: email
      }

      generateAccessToken(payload).then((token) => {
        // Return success response
        res.status(200).json({
          message: 'Login successful',
          token: token
        });
      }).catch((error) => {
        console.log('error durign token creation => ', error);
        res.status(500).json({
          message: 'Internal server error'
        });
      })
    })
    .catch((error) => {
      console.error('Database error:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    });
});

module.exports = router;