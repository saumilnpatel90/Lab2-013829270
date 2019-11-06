"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const {secret} = require('./config');
var kafka = require('../kafka/client');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      if(jwt_payload.userType === 'buyer'){
        kafka.make_request("passport", {type: "buyer", message: jwt_payload.id},
        function(err, result) {
            if(result){
              callback(null, result);
            }else{
              callback(err,false);
            }
        });
      } else {
        kafka.make_request("passport", {type: "owner", message: jwt_payload.id},
        function(err, result) {
            if(result){
              callback(null, result);
            }else{
              callback(err,false);
            }
        });
      }
    },function(err) {
          return callback(err, false);
        }
      )
    );
  }