const express = require('express');
const router = express.Router();
const db = require('../db');
const config = require('../config/index');

router.post('/', (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;

  // Insert the form data into the clients table
  db.query(
    'INSERT INTO clients (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5)',
    [firstName, lastName, email, phone, address]
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
