const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM clients')
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