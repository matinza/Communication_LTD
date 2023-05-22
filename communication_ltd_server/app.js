const express = require("express")
const cors = require("cors")
const db = require('./db');
const {
  verifyToken
} = require('./jwt/index')
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const systemAddClientsRoute = require('./routes/systemAddClients');
const systemGetClientsRoute = require('./routes/systemGetClients');
const systemSearchClientsRoute = require('./routes/systemSearchClients');
const changePasswordRoute = require('./routes/changePassword');
const forgotPasswordRoute = require('./routes/forgotPassword');

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
app.use('/login', loginRoute)
app.use("/systemAddClient", verifyToken, systemAddClientsRoute)
app.use("/systemGetClients", verifyToken, systemGetClientsRoute)
app.use("/systemSearchClients", verifyToken, systemSearchClientsRoute)
app.use("/changePassword", verifyToken, changePasswordRoute)
app.use("/forgotPassword", forgotPasswordRoute)

module.exports = app;