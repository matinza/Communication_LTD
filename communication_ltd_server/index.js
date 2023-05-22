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

// const options = {
//   // key: fs.readFileSync('./sslcert/server.key'),
//   // cert: fs.readFileSync('./sslcert/server.crt')
//   port: 443,
//   key: fs.readFileSync('localhost-key.pem'),
//   cert: fs.readFileSync('localhost.pem'),
//   minVersion: tls.Server.TLSv1_2_method
// };
// const server = https.createServer(options, app);

// const port = process.env.APP_PORT || 443;
// server.listen(port, () => {
//   console.log(`Listening at https://localhost:${port}`);
// });





// const privateKeyPath = process.env.PRIVATE_KEY_PATH || 'C:/Users/dolev/Desktop/localhost.key';
// const certificatePath = process.env.CERTIFICATE_PATH || 'C:/Users/dolev/Desktop/localhost.crt';

// // Load the SSL certificate and private key
// const privateKey = fs.readFileSync(privateKeyPath);
// const certificate = fs.readFileSync(certificatePath);


// // Create an HTTPS server with TLS 1.2
// const server = https.createServer({ key: privateKey, cert: certificate, secureProtocol: 'TLSv1_2_method' }, app);
