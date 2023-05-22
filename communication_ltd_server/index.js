const https = require('https');
const fs = require('fs');
const path = require('path');
const tls = require('tls');
const app = require('./app');
require('dotenv').config()

const options = {
  // key: fs.readFileSync('./sslcert/server.key'),
  // cert: fs.readFileSync('./sslcert/server.crt')
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
  minVersion: tls.Server.TLSv1_2_method
};
const server = https.createServer(options, app);

const port = process.env.APP_PORT || 4000;
server.listen(port, () => {
  console.log(`Listening at https://localhost:${port}`);
});