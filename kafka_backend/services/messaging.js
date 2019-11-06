const queries = require('../utils/queries');

exports.messagingService = function messagingService(message, callback) {
  console.log("Inside Kafka Backend messaging service === ", message);
  
  queries.addMessage(message, result => {
    callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something failed when adding message to the order. ${err}` };
        callback(errorDetails, null);
  });
};