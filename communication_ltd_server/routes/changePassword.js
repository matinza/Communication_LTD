const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config/index');
const moment = require('moment');

router.post('/', (req, res) => {
  const {
    currentPassword,
    newPassword
  } = req.body;

  const email = req.user.userEmail

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
        salt,
        password: db_hashedPassword,
        reset_password_token,
        reset_password_expires,
        login_attempts,
        last_login_attempt,
        password_history
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
            message: 'Maximum attempts exceeded. Please try again later.'
          });
        } else {
          // Reset the login_attempts field and update the last_login_attempt field
          db.query('UPDATE users SET login_attempts = 0, last_login_attempt = $1 WHERE email = $2', [now, email])
            .catch((error) => {
              console.error('Database error:', error);
            });
        }
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



      const reset_token_now = moment();
      const lastResetTime = moment(reset_password_expires, 'YYYY-MM-DD HH:mm:ss');
      const diffInMinutes = moment.duration(reset_token_now.diff(lastResetTime)).asMinutes();

      let lessThan30Minutes = false
      if (diffInMinutes < 30) {
        lessThan30Minutes = true
      }

      // Check validataion of the current password & expiration
      const isResetTokenValid = currentPassword === reset_password_token && lessThan30Minutes;

      let hmac = crypto.createHmac('sha512', salt);
      hmac.update(currentPassword);
      const hashedCurrentPassword = hmac.digest('hex');

      // Compare the hashed current password with the stored hashed password
      if (hashedCurrentPassword !== db_hashedPassword && !isResetTokenValid) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query('UPDATE users SET login_attempts = $1, last_login_attempt = $2 WHERE email = $3', [login_attempts + 1, now, email])
          .catch((error) => {
            console.error('Database error:', error);
          });
        return res.status(401).json({
          message: 'Password is wrong and no valid reset token provided'
        });
      }

      // If the reset token was used, clear it from the database
      if (isResetTokenValid) {
        db.query('UPDATE users SET reset_password_token = null, reset_password_expires = null WHERE email = $1', [email])
          .catch((error) => {
            console.error('Database error:', error);
          });
      }

      // Password is correct, reset the login_attempts field to 0 and update the last_login_attempt field
      const now = moment().format('YYYY-MM-DD HH:mm:ss');
      db.query('UPDATE users SET login_attempts = 0, last_login_attempt = $1 WHERE email = $2', [now, email])
        .catch((error) => {
          console.error('Database error:', error);
        });

      // Generate salt for password hashing
      const new_salt = crypto.randomBytes(16).toString('hex');

      // Hash password with HMAC + salt
      hmac = crypto.createHmac('sha512', new_salt);
      hmac.update(newPassword);
      const hashedNewPassword = hmac.digest('hex');

      // // Check password history
      // for (let element of password_history) {
      //   let converted_value = JSON.parse(element);
      //   hmac = crypto.createHmac('sha512', converted_value.salt);
      //   hmac.update(newPassword); // Updated to newPassword
      //   let hashedNewPasswordWithOldSalt = hmac.digest('hex');

      //   if (hashedNewPasswordWithOldSalt === converted_value.password) { // Updated to converted_value.password
      //     return res.status(400).json({
      //       message: 'New password cannot be the same as a previously used password'
      //     });
      //   }
      // }

      // // Check if there are more than the forbidden passwords in the config
      // if (password_history.length >= config.passwordHistory) {
      //   // Remove the oldest password
      //   password_history.shift();
      // }

      // const passwordHistory = [{
      //   password: hashedNewPassword,
      //   salt: new_salt
      // }];
      // password_history.push(passwordHistory)

      // update password
      db.query(`UPDATE users SET           
            password = $2,
            salt = $3,
            password_history = $4
            WHERE email = $1`,
          [email, hashedNewPassword, new_salt, ['']])
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
      console.log(error.message);
      return res.status(500).json({
        message: 'Internal server message'
      })
    })
});

module.exports = router;