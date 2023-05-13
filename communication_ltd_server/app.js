const express = require("express")
const cors = require("cors")
const db = require('./db');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors({
  origin: "https://localhost:3000",
  credentials: true
}));

db.connectCommunication_LTD_DB();

app.use('/register', registerRoute)
// app.use('/login', loginRoute)

module.exports = app;
