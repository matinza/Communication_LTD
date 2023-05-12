const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/index');

router.post('/', (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  // Check if required fields are present
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: 'Missing required fields'
    });
  }

  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400).json({
          message: 'User already exists'
        });
      }
    })

  // Validate password complexity
  const passwordLength = config.passwordLength;
  const passwordComplexity = config.passwordComplexity;
  const passwordDictionary = config.passwordDictionary;

  if (password.length < passwordLength) {
    return res.status(400).json({
      message: `Password must be at least ${passwordLength} characters long`
    });
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

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

  if (passwordDictionary.some((word) => password.toLowerCase().includes(word))) {
    return res.status(400).json({
      message: 'Password cannot contain commonly used words'
    });
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
            salt) VALUES
            ($1, $2, $3, $4, $5)`,
      [firstName, lastName, email, hashedPassword, salt])
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
      res.status(200).json({
        message: 'User registered successfully'
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