const queries = require('../utils/queries');

exports.buyer_orderService = function buyer_orderService(info, callback) {
  console.log("Inside Kafka Backend buyer_order service === ", info);
  switch (info.type) {
    case "searchRestaurants":
        searchRestaurants(info.message, callback);
        break;
    case "getRestaurantImage":
        getRestaurantImage(info.message, callback);
        break;
    case "getSections":
        getSections(info.message, callback);
        break;
    case "createOrder":
        createOrder(info.message, callback);
        break;
    case "getPastOrders":
        getPastOrders(info.message, callback);
        break;
    case "getUpcomingOrders":
        getUpcomingOrders(info.message, callback);
        break;
  }
};

function searchRestaurants(restName, callback) {
    console.log("Inside Kafka Backend Search Restaurant service");
  
    queries.getAllMatchingRestaurants(restName, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something wrong while getting restaurants. ${err}` };
        callback(errorDetails, null);
    });
}

function getRestaurantImage(restId, callback) {
    console.log("Inside Kafka Backend Get Restaurant Image service");
    
    queries.getRestaurantImageNameById(restId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something wrong when reading restaurant image. ${err}` };
        callback(errorDetails, null);
    });
}

function getSections(restId, callback) {
  console.log("Inside Kafka Backend Get Sections service");

  queries.getSectionsByRestaurantId(restId, result => {
    callback(null, result);   
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something failed when getting menu items. ${err}`};
        callback(errorDetails, null);
    });
}

function createOrder(order, callback) {
    console.log("Inside Kafka Backend Create Order service");

    queries.createOrder(order, result => {
        console.log("Order Created succesfully");
        callback(null, result);  
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something failed when creating order. ${err}`};
        callback(errorDetails, null);
    });
}

function getPastOrders(buyerId, callback) {
    console.log("Inside Kafka Backend Get Past Orders service");

    queries.getPastOrdersbyBuyerId(buyerId, result => {
        callback(null, result);   
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message:`Something failed when getting order details from the table. ${err}` };
        callback(errorDetails, null);
    });
}

function getUpcomingOrders(buyerId, callback) {
    console.log("Inside Kafka Backend Get Upcoming Orders service");

    queries.getUpcomingOrdersbyBuyerId(buyerId, result => {
        callback(null, result);   
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message:`Something failed when getting order details from the table. ${err}` };
        callback(errorDetails, null);
    });
}