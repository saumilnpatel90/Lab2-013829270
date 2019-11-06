const queries = require('../utils/queries');

exports.passportService = function passportService(info, callback) {
  console.log("Inside Kafka Backend passport service === ", info);
  switch (info.type) {
    case "buyer":
        authenticateBuyer(info.message, callback);
        break;
    case "owner":
        authenticateOwner(info.message, callback);
        break;
  }
};

function authenticateBuyer(id, callback) {
    console.log("Inside Kafka Backend Authenticate Buyer service");
  
    queries.authenticateBuyer(id, result => {
      callback(null, result);
      }, err => {
          callback(err, null);
    });
}

function authenticateOwner(id, callback) {
    console.log("Inside Kafka Backend Authenticate Owner service");
  
    queries.authenticateOwner(id, result => {
      callback(null, result);
      }, err => {
          callback(err, null);
    });
}