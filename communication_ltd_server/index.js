const https = require('https');
const fs = require('fs');
const path = require('path');
const tls = require('tls');
const app = require('./app');
require('dotenv').config()

privateKey =  fs.readFileSync('./sslcert/server.key')
certificate =  fs.readFileSync('./sslcert/server.crt')

const server = https.createServer({
  key: privateKey,
  cert: certificate,
  secureProtocol: 'TLSv1_2_method'
}, app);

// Start the server and listen for incoming requests on port 443
const port = process.env.APP_PORT || 443;
server.listen(port, () => {
  console.log(`HTTPS server running on ${port}`);
});