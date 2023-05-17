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