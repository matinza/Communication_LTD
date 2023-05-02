const express = require("express")
const cors = require("cors")
const db = require('./db');
const registerRoute = require('./routes/register');

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

db.connectCommunication_LTD_DB();

app.use('/register', registerRoute);

module.exports = app;