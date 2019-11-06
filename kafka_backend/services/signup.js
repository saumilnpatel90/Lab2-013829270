const encrypt = require('../utils/encrypt');
const queries = require('../utils/queries');

exports.signupService = function signupService(info, callback) {
  console.log("Inside Kafka Backend sign up service === ", info);
  switch (info.type) {
    case "buyer":
      buyerSignUp(info.message, callback);
      break;
    case "owner":
      ownerSignUp(info.message, callback);
      break;
    case "restaurant":
      createRestaurant(info.message, callback);
      break;
  }
};

function buyerSignUp(buyer, callback) {
  console.log("Inside Kafka Backend Buyer Sign Up service");

  encrypt.generateHash(buyer.password, hash => {
    queries.createBuyer(buyer,hash, result => {
      console.log("Buyer created with id: " + result._id);
      callback(null, result);
    }, err => {
      let errorDetails = {};
      if(err.code === 11000){
        errorDetails.statusCode = 401;
        errorDetails.info = {success: false, message: 'Email already exists. Plz sign up with a different email id'};
      } else{
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something failed when inserting record. ${err}`};
      }
      callback(errorDetails, null);
    });
  }, err => {
    let errorDetails = {};
    errorDetails.statusCode = 500;
    errorDetails.info = { success: false, error: 'Something failed when gnerating hash' };
    callback(errorDetails, null);
  });
}

function ownerSignUp(owner, callback) {
  console.log("Inside Kafka Backend Owner Sign Up service");

  encrypt.generateHash(owner.password, hash => {
    queries.createOwner(owner,hash, result => {
      console.log("Owner created with id: " + result._id);
      callback(null, result);
    }, err => {
      let errorDetails = {};
      if(err.code === 11000){
        errorDetails.statusCode = 401;
        errorDetails.info = {success: false, message: 'Email already exists. Plz sign up with a different email id'};
      } else{
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something failed when inserting record. ${err}`};
      }
      callback(errorDetails, null);
    });
  }, err => {
    let errorDetails = {};
    errorDetails.statusCode = 500;
    errorDetails.info = { success: false, error: 'Something failed when gnerating hash' };
    callback(errorDetails, null);
  });
}

function createRestaurant(restaurant, callback) {
  console.log("Inside Kafka Backend Create Restaurant service");
  queries.createRestaurant(restaurant, result => {
    console.log("Restaurant added with id: " + result._id);
    callback(null, result);
  }, err => {
    let errorDetails = {};
      if(err.code === 11000){
        errorDetails.statusCode = 401;
        errorDetails.info = {success: false, message: 'A restaurant with this name already exists.'};
      } else{
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Internal Error. ${err}` };
      }
      callback(errorDetails, null);
  });
}