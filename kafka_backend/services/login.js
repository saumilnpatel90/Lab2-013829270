const encrypt = require('../utils/encrypt');
const queries = require('../utils/queries');

exports.loginService = function loginService(info, callback) {
  console.log("Inside Kafka Backend login service === ", info);
  switch (info.type) {
    case "buyer":
      buyerLogin(info.message, callback);
      break;
    case "owner":
      ownerLogin(info.message, callback);
      break;
  }
};

function buyerLogin(buyer, callback) {
  console.log("Inside Kafka Backend Buyer Login service");

  queries.getBuyerPasswordByEmail(buyer.email, row => {
    if(row){
        encrypt.confirmPassword(buyer.password,row.password, result => {
            if (result){
                callback(null, {id: row._id, firstName: row.fname});
            }else{
                let errorDetails = {};
                errorDetails.statusCode = 401;
                errorDetails.info = {success: false, message: 'Incorrect Password'};
                callback(errorDetails, null);
            }
            }, err => {
                let errorDetails = {};
                errorDetails.statusCode = 500;
                errorDetails.info = {success: false, message: 'Something wrong with bcrypt'};
                callback(errorDetails, null);
            });
        }else{
            let errorDetails = {};
            errorDetails.statusCode = 401;
            errorDetails.info = {success: false, message: 'Email does not exists. Please try again'};
            callback(errorDetails, null);
        }
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: 'Something wrong when reading the record'};
        callback(errorDetails, null);
    });
}

function ownerLogin(owner, callback) {
    console.log("Inside Kafka Backend Buyer Login service");

    queries.getOwnerPasswordByEmail(owner.email, row => {
        if(row){
            encrypt.confirmPassword(owner.password,row.password, result => {
                if (result){
                    callback(null, {id: row._id, firstName: row.fname});
                }else{
                    let errorDetails = {};
                    errorDetails.statusCode = 401;
                    errorDetails.info = {success: false, message: 'Incorrect Password'};
                    callback(errorDetails, null);
                }
                }, err => {
                    let errorDetails = {};
                    errorDetails.statusCode = 500;
                    errorDetails.info = {success: false, message: 'Something wrong with bcrypt'};
                    callback(errorDetails, null);
                });
            }else{
                let errorDetails = {};
                errorDetails.statusCode = 401;
                errorDetails.info = {success: false, message: 'Email does not exists. Please try again'};
                callback(errorDetails, null);
            }
        }, err => {
            let errorDetails = {};
            errorDetails.statusCode = 500;
            errorDetails.info = {success: false, message: 'Something wrong when reading the record'};
            callback(errorDetails, null);
        }
    );
}