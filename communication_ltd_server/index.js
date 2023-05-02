const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config()

const options = {
  key: fs.readFileSync('./sslcert/server.key'),
  cert: fs.readFileSync('./sslcert/server.crt')
};
const server = https.createServer(options, app);

const port = process.env.APP_PORT || 4000;
server.listen(port, () => {
  console.log(`Listening at https://localhost:${port}`);
});

// const express = require("express")
// const app = express()
// const cors = require("cors")
// const db = require('./db/index');

// const port = 4000

// app.use(express.json())
// app.use(cors())

// db.connectCommunication_LTD_DB()

// app.get("/register", cors(), async (req, res) => {
//   result = db.query(`INSERT INTO users
//                      (first_name,
//                       last_name,
//                       email,
//                       password,
//                       phone,
//                       address) VALUES
//                       ('${req.body.first_name}',
//                        '${req.body.last_name}',
//                        '${req.body.email}',
//                        '${req.body.password}',
//                        '${req.body.phone}',
//                        '${req.body.address}')`);

//   result.then(() => {
//     res.status(200).json({
//       answer: "success"
//     })
//   }).catch((error) => {
//     res.status(500).json({
//       answer: "failure" + error
//     })
//   })
// })

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// })