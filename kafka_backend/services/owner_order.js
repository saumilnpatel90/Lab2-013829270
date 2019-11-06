const queries = require('../utils/queries');

exports.owner_orderService = function owner_orderService(info, callback) {
  console.log("Inside Kafka Backend owner_order service === ", info);
  switch (info.type) {
    case "getAllOrders":
        getAllOrders(info.message, callback);
        break;
    case "updateOrder":
        updateOrder(info.message, callback);
        break;
  }
};

function getAllOrders(ownerId, callback) {
    console.log("Inside Kafka Backend Get All Orders service");
  
    queries.getAllOrders(ownerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting order details. ${err}` };
        callback(errorDetails, null);
    });
}

function updateOrder(order, callback) {
    console.log("Inside Kafka Backend Update Order service");
    
    queries.updateOrderStatus(order, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when updating order status. ${err}` };
        callback(errorDetails, null);
    });
}