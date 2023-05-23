const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Insert the form data into the clients table
  db.query(
    'INSERT INTO clients (first_name, last_name, email, phone, address) VALUES ($1, $2, $3, $4, $5)',
    [firstName, lastName, email, 'null', 'null']
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
