const express = require('express');
const router = express.Router();
const db = require('../../db');
const config = require('../../config/index');

router.post('/getClients', (req, res) => {
  db.query(
      'select * from clients'
    )
    .then((result) => {
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