const {
  Client
} = require('pg');
var colors = require('colors');
var myClient = null;
require('dotenv').config()

connectCommunication_LTD_DB = () => {
  return new Promise((resolve, reject) => {
    try {
      const client = new Client({
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });

      client.connect(function (err) {
        if (err) {
          console.log('err===> ' + err);
          throw err;
        } else {
          myClient = client;
          console.log(colors.green(`SUCCESS: connected to Communication_LTD database!`));
        }
      })
      resolve();
    } catch (error) {
      console.log(colors.red(`FAILURE: ${error}`));
      reject(error);
    }
  });
};

query = (queryText, values = []) => {
  return new Promise((resolve, reject) => {
    try {
      const result = myClient.query(queryText, values);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  connectCommunication_LTD_DB: connectCommunication_LTD_DB,
  query: query,
};