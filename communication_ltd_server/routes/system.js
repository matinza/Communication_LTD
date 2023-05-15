const express = require('express');
const router = express.Router();
const db = require('../db');
const config = require('../config/index');

router.post('/', (req, res) => {
  console.log(req.body.firstName);
})

module.exports = router;