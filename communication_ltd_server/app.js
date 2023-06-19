const express = require("express");
const cors = require("cors");
const db = require('./db');
const { verifyToken } = require('./jwt/index');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const systemAddClientsRoute = require('./routes/systemAddClients');
const systemGetClientsRoute = require('./routes/systemGetClients');
const systemSearchClientsRoute = require('./routes/systemSearchClients');
const changePasswordRoute = require('./routes/changePassword');
const forgotPasswordRoute = require('./routes/forgotPassword');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: ["https://localhost:8080", "http://127.0.0.1:8080"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

db.connectCommunication_LTD_DB();

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use("/systemAddClient", verifyToken, systemAddClientsRoute);
app.use("/systemGetClients", verifyToken, systemGetClientsRoute);
app.use("/systemSearchClients", verifyToken, systemSearchClientsRoute);
app.use("/changePassword", verifyToken, changePasswordRoute);
app.use("/forgotPassword", forgotPasswordRoute);

module.exports = app;
