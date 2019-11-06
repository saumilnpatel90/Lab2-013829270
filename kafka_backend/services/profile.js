const queries = require('../utils/queries');

exports.profileService = function profileService(info, callback) {
  console.log("Inside Kafka Backend profile service === ", info);
  switch (info.type) {
    case "getBuyerDetails":
        getBuyerDetails(info.message, callback);
        break;
    case "getBuyerProfilePic":
        getBuyerProfilePic(info.message, callback);
        break;
    case "getBuyerFirstName":
        getBuyerFirstName(info.message, callback);
        break;
    case "updateBuyerProfile":
        updateBuyerProfile(info.message, callback);
        break;
    case "updateBuyerImage":
        updateBuyerImage(info.message, callback);
        break;
    case "updateBuyerAddress":
        updateBuyerAddress(info.message, callback);
        break;
    case "getOwnerDetails":
        getOwnerDetails(info.message, callback);
        break;
    case "getOwnerProfilePic":
        getOwnerProfilePic(info.message, callback);
        break;
    case "getOwnerFirstName":
        getOwnerFirstName(info.message, callback);
        break;
    case "updateOwnerProfile":
        updateOwnerProfile(info.message, callback);
        break;
    case "updateOwnerImage":
        updateOwnerImage(info.message, callback);
        break;
    case "getRestaurantDetails":
        getRestaurantDetails(info.message, callback);
        break;
    case "getRestaurantProfilePic":
        getRestaurantProfilePic(info.message, callback);
        break;
    case "updateRestaurantProfile":
        updateRestaurantProfile(info.message, callback);
        break;
    case "updateRestaurantImage":
        updateRestaurantImage(info.message, callback);
        break;
  }
};

function getBuyerDetails(buyerId, callback) {
    console.log("Inside Kafka Backend Get Buyer Details service");
  
    queries.getBuyerDetailsById(buyerId, result => {
      callback(null, result);
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, mesage: `Something wrong when getting buyer details. ${err}` };
          callback(errorDetails, null);
      });
}
  
function getBuyerProfilePic(buyerId, callback) {
    console.log("Inside Kafka Backend Get Buyer Profile Pic service");

    queries.getBuyerImageNameById(buyerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when reading buyer image. ${err}`};
        callback(errorDetails, null);
    });
}

function getBuyerFirstName(buyerId, callback) {
    console.log("Inside Kafka Backend Get Buyer First Name service");
    
    queries.getBuyerFirstNameById(buyerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something wrong when reading buyer first name. ${err}` };
        callback(errorDetails, null);
    });
}

function updateBuyerProfile(buyer, callback) {
  console.log("Inside Kafka Backend Buyer Profile Update service");

  queries.updateBuyerProfile(buyer, result => {
    console.log("Buyer profile updated succesfully");
    callback(null, result);   
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message: `Something wrong when updating buyer profile. ${err}`};
        callback(errorDetails, null);
    });
}

function updateBuyerImage(buyer, callback) {
    console.log("Inside Kafka Backend Update Buyer Image service");

    queries.updateBuyerImage({id: buyer.id, image: buyer.image}, result => {
        console.log("Buyer image updated succesfully");
        callback(null, result);  
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when updating buyer image in the table. ${err}`};
        callback(errorDetails, null);
    });
}

function updateBuyerAddress(buyer, callback) {
    console.log("Inside Kafka Backend Update Buyer Address service");

    queries.updateBuyerAddress(buyer, result => {
        console.log("Buyer address and phone updated succesfully");
        callback(null, result);   
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, message:`Something wrong when updating buyer address. ${err}` };
        callback(errorDetails, null);
    });
}

function getOwnerDetails(ownerId, callback) {
    console.log("Inside Kafka Backend Get Owner Details service");
  
    queries.getOwnerDetailsById(ownerId, result => {
      callback(null, result);
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, mesage: `Something wrong when getting owner details. ${err}` };
          callback(errorDetails, null);
    });
}

function getOwnerProfilePic(ownerId, callback) {
    console.log("Inside Kafka Backend Get Owner Profile Pic service");

    queries.getOwnerImageNameById(ownerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when reading owner image. ${err}`};
        callback(errorDetails, null);
    });
}

function getOwnerFirstName(ownerId, callback) {
    console.log("Inside Kafka Backend Get Owner First Name service");

    queries.getOwnerFirstNameById(ownerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something wrong when reading owner first name. ${err}` };
        callback(errorDetails, null);
    });
}

function updateOwnerProfile(owner, callback) {
    console.log("Inside Kafka Backend Owner Profile Update service");
  
    queries.updateOwnerProfile(owner, result => {
      console.log("Owner profile updated succesfully");
      callback(null, result);   
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, message: `Something wrong when updating buyer profile. ${err}`};
          callback(errorDetails, null);
    });
}

function updateOwnerImage(owner, callback) {
    console.log("Inside Kafka Backend Update Owner Image service");

    queries.updateOwnerImage({id: owner.id, image: owner.image}, result => {
        console.log("Owner image updated succesfully");
        callback(null, result);  
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when updating owner image in the table. ${err}`};
        callback(errorDetails, null);
    });
}

function getRestaurantDetails(ownerId, callback) {
    console.log("Inside Kafka Backend Get Restaurant Details service");
  
    queries.getRestaurantDetailsByOwnerId(ownerId, result => {
      callback(null, result);
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, mesage: `Something wrong when getting restaurant details. ${err}` };
          callback(errorDetails, null);
      });
}

function getRestaurantProfilePic(ownerId, callback) {
    console.log("Inside Kafka Backend Get Restaurant Profile Pic service");

    queries.getRestaurantImageNameByOwnerId(ownerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when reading restaurant image. ${err}`};
        callback(errorDetails, null);
    });
}

function updateRestaurantProfile(restaurant, callback) {
    console.log("Inside Kafka Backend Restaurant Profile Update service");
  
    queries.updateRestaurantProfile(restaurant, result => {
      console.log("Restaurant profile updated succesfully");
      callback(null, result);   
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = { success: false, message: `Something wrong when updating restaurant profile. ${err}`};
          callback(errorDetails, null);
      });
  }
  
  function updateRestaurantImage(restaurant, callback) {
      console.log("Inside Kafka Backend Update Restaurant Image service");
  
      queries.updateRestaurantImageByOwnerId({ownerId: restaurant.ownerId, image: restaurant.image}, result => {
          console.log("Restaurant image updated succesfully");
          callback(null, result);  
      }, err => {
          let errorDetails = {};
          errorDetails.statusCode = 500;
          errorDetails.info = {success: false, message: `Something wrong when updating restaurant image in the table. ${err}`};
          callback(errorDetails, null);
      });
  }