var express = require('express');
var router = express.Router();
const path = require('path');
const {secret} = require('../config/config');
var passport = require("passport");
var jwt = require("jsonwebtoken");
var kafka = require('../kafka/client');

router.post('/signup',function(req,res){
    console.log("Inside Owner signup Post Request");
    console.log("Req Body : ",req.body);
    const owner = req.body;

    kafka.make_request("signup", {type: "owner", message: owner},
        function(err, result) {
            if(result){
                res.status(200).send({success: true, id: result._id, message:'Owner created'});
            }else{
                res.status(err.statusCode).send(err.info);
            }
        }
    );
});

router.post('/login',function(req,res){
    console.log("Inside Owner Login Post Request");
    console.log("Req Body : ",req.body);

    const owner = req.body;

    kafka.make_request("login", {type: "owner", message: owner},
        function(err, result) {
            if(result){
                let user = {
                    email: owner.email,
                    id: result.id,
                    userType: 'owner'
                }
                var token = jwt.sign(user, secret, {
                    expiresIn: 10080 // in seconds
                });
                res.status(200).json({success: true, message: "Owner Login successful", id: result.id, firstName: result.firstName, token: token});
            }else{
                res.status(err.statusCode).send(err.info);
            }
    });
});

router.get('/firstName',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Owner First Name Get Request");
    console.log("Req Query : ",req.body);

    kafka.make_request("profile", {type: "getOwnerFirstName", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, firstName: result.fname});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateProfile',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Owner Update Profile Post Request");
    console.log("Req Query : ",req.query);

    let owner = req.body;
    owner.id = req.query.id;
    kafka.make_request("profile", {type: "updateOwnerProfile", message: owner},
        function(err, result) {
              if(result){
                res.status(200).json({success:true, message:'Owner profile updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/details',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Owner Details Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getOwnerDetails", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, owner: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/profilePic',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Owner profile pic Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getOwnerProfilePic", message: req.query.id},
        function(err, result) {
            if(result){
                res.sendFile(path.join(__dirname, `../uploads/${result.image}`));
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/addRestaurant',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside add Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    kafka.make_request("signup", {type: "restaurant", message: restaurant},
        function(err, result) {
            if(result){
                res.status(200).send({success: true, message:'Restaurant created'});
            }else{
                res.status(err.statusCode).send(err.info);
            }
        }
    );
});

module.exports = router;