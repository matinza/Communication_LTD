const dbConfig = require('../config/Communication_LTD_DBConfig');
const {
  Client
} = require('pg');
var colors = require('colors');
var myClient = null;

connectCommunication_LTD_DB = () => {
  return new Promise((resolve, reject) => {
    try {
      const dbDetails = dbConfig.DATABASE_CONNECTION_DETAILS();
      const client = new Client({
        host: dbDetails.host,
        user: dbDetails.user,
        port: dbDetails.port,
        password: dbDetails.password,
        database: dbDetails.database,
      });

      client.connect(function (err) {
        if (err) {
          console.log('err===> '+err);
          throw err;
        }else{
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