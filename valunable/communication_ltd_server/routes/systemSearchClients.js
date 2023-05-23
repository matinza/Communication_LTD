const express = require('express');
const router = express.Router();
const db = require('../db');

router.patch('/', (req, res) => {
  const { searchQuery } = req.body;

  db.query(`SELECT *
            FROM clients
            WHERE first_name ILIKE '%${searchQuery}%'
               OR last_name ILIKE '%${searchQuery}%'
               OR email ILIKE '%${searchQuery}%`)
    .then((result) => {
      res.status(200).json({
        clients: result.rows
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