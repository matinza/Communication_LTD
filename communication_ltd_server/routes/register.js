const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/index');

router.post('/', (req, res) => {
  log('got here <=================================================================')
  log('got here <=================================================================')
  log('got here <=================================================================')
  const { first_name, last_name, email, password, phone, address } = req.body;

  // Check if required fields are present
  if (!first_name || !last_name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate password complexity
  const passwordLength = config.passwordLength;
  const passwordComplexity = config.passwordComplexity;
  const passwordDictionary = config.passwordDictionary;
  const passwordHistory = config.passwordHistory;

  if (password.length < passwordLength) {
    return res.status(400).json({ message: `Password must be at least ${passwordLength} characters long` });
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (passwordComplexity.uppercase && !hasUppercase) {
    return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
  }

  if (passwordComplexity.lowercase && !hasLowercase) {
    return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });
  }

  if (passwordComplexity.numbers && !hasNumber) {
    return res.status(400).json({ message: 'Password must contain at least one number' });
  }

  if (passwordComplexity.specialCharacters && !hasSpecialChar) {
    return res.status(400).json({ message: 'Password must contain at least one special character' });
  }

  if (passwordDictionary.some((word) => password.toLowerCase().includes(word))) {
    return res.status(400).json({ message: 'Password cannot contain commonly used words' });
  }

  // Generate salt for password hashing
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash password with HMAC + salt
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(password);
  const hashedPassword = hmac.digest('hex');

  // Store user in database
  db.query(`INSERT INTO users
           (first_name,
            last_name,
            email,
            password,
            phone,
            address,
            salt) VALUES
            ($1, $2, $3, $4, $5, $6, $7)`,
           [first_name, last_name, email, hashedPassword, phone, address, salt])
    .then(() => {
      // Send confirmation email
      const transporter = nodemailer.createTransport(config.emailTransport);
      const mailOptions = {
        from: config.emailFrom,
        to: email,
        subject: 'Welcome to our app!',
        text: 'Thank you for registering.'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      // Return success response
      res.json({ message: 'User registered successfully' });
    })
    .catch((error) => {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
