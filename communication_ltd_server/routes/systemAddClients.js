const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');

router.post('/',[
  body('firstName').trim(),
  body('lastName').trim(),
  body('email').trim()
], (req, res) => {

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email } = req.body;

  // Insert the form data into the clients table
  db.query(
    'INSERT INTO clients (first_name, last_name, email) VALUES ($1, $2, $3)',
    [firstName, lastName, email]
  )
    .then(() => {
      res.status(200).json({
        message: 'New client added successfully'
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
