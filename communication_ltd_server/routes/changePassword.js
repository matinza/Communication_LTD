const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/index');

// Email validation regular expression
// The email address can contain alphanumeric characters, special characters (.!#$%&'*+/=?^_{|}~-), and dots (.`) within the local part.
// The local part must be followed by the @ symbol.
// The domain part can contain alphanumeric characters and hyphens (-).
// The domain can have multiple segments separated by dots (.).
// The pattern allows for top-level domains (TLDs) with multiple segments, such as .co.uk.
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

router.post('/', (req, res) => {
  const {
    currentPassword,
    newPassword
  } = req.body;

  const email = req.user.email

  db.query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error("Internal server error")
      }
    })
    .then((result) => {
      const user = result.rows[0];
      const {
        salt,
        password: db_hashedPassword,
      } = user;

      const current_hmac = crypto.createHmac('sha512', salt);
      current_hmac.update(currentPassword);
      const hashedCurrentPassword = hmac.digest('hex');

      // Compare the hashed current password with the stored hashed password
      if (hashedCurrentPassword !== db_hashedPassword) {
        return res.status(401).json({
          message: 'Password is wrong'
        });
      }

      // Validate password complexity
      const passwordLength = config.passwordLength;
      const passwordComplexity = config.passwordComplexity;
      const passwordDictionary = config.passwordDictionary;

      if (newPassword.length < passwordLength) {
        return res.status(400).json({
          message: `Password must be at least ${passwordLength} characters long`
        });
      }

      const hasUppercase = /[A-Z]/.test(newPassword);
      const hasLowercase = /[a-z]/.test(newPassword);
      const hasNumber = /[0-9]/.test(newPassword);
      const hasSpecialChar = /[!@#$%^&*]/.test(newPassword);

      if (passwordComplexity.uppercase && !hasUppercase) {
        return res.status(400).json({
          message: 'Password must contain at least one uppercase letter'
        });
      }

      if (passwordComplexity.lowercase && !hasLowercase) {
        return res.status(400).json({
          message: 'Password must contain at least one lowercase letter'
        });
      }

      if (passwordComplexity.numbers && !hasNumber) {
        return res.status(400).json({
          message: 'Password must contain at least one number'
        });
      }

      if (passwordComplexity.specialCharacters && !hasSpecialChar) {
        return res.status(400).json({
          message: 'Password must contain at least one special character'
        });
      }

      if (passwordDictionary.some((word) => newPassword.toLowerCase().includes(word))) {
        return res.status(400).json({
          message: 'Password cannot contain commonly used words'
        });
      }
      
      // Generate salt for password hashing
      const generateSalt = crypto.randomBytes(16).toString('hex');

      // Hash password with HMAC + salt
      const hmac = crypto.createHmac('sha512', salt);
      hmac.update(newPassword);
      const hashedPassword = hmac.digest('hex');

      // update password
      db.query(`UPDATE users SET           
            password = $2,
            salt = $3
            WHERE email = $1`,
          [email, hashedPassword, salt])
        .then(() => {
          // Send confirmation email
          const transporter = nodemailer.createTransport(config.emailTransport);
          const mailOptions = {
            from: config.emailFrom,
            to: email,
            subject: 'Changed Password Successfuly!',
            text: 'You changed your password successfuly!'
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Email error:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });

          // Return success response
          res.status(200).json({
            message: 'Changed Password Succeffuly!'
          });
        })
        .catch((error) => {
          console.error('Database error:', error);
          res.status(500).json({
            message: 'Internal server error'
          });
        })
    })
    .catch((error) => {
      return res.status(400).json({
        message: error.message
      })
    })
});

module.exports = router;