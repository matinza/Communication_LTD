const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/index');
const moment = require('moment');

router.post('/', (req, res) => {
  const {
    email
  } = req.body;

  db.query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error("Internal server error")
      }
      return result.rows[0]
    })
    .then((result) => {
      const user = result;
      const {
        id,
        email
      } = user;

      // generate token
      payload = {
        userId: id,
        userEmail: email
      }

      generateAccessToken(payload).then((token) => {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query('UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE email = $3', [token, now, email])
        .catch((error) => {
          console.error('Database error:', error);
        });

        // Send confirmation email
        const transporter = nodemailer.createTransport(config.emailTransport);
        const mailOptions = {
          from: config.emailFrom,
          to: email,
          subject: 'Your new current password',
          text: token
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Email error:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
        // Return success response
        res.status(200).json({});
      }).catch((error) => {
        console.log('error durign token creation => ', error);
        res.status(500).json({
          message: 'Internal server error'
        });
      })
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server message (check your email is valid and try again)'
      })
    })
})

module.exports = router;