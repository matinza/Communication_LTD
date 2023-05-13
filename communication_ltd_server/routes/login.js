const express = require('express');
const router = express.Router();
const db = require('../db');
const config = require('../config/index');

router.get('/', (req, res, next) => {
  const {
    email,
    password
  } = req.body;
})
