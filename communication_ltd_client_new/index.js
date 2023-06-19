const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'components')));

const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
};

https.createServer(httpsOptions, app).listen(8080, function () {
  console.log('HTTPS client running on port 8080');
});