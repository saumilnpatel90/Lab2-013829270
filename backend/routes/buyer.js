var express = require('express');
var router = express.Router();
const path = require('path');
const {secret} = require('../config/config');
var passport = require("passport");
var jwt = require("jsonwebtoken");
var kafka = require('../kafka/client');

router.post('/signup',function(req,res){
    console.log("Inside Buyer signup Post Request");
    console.log("Req Body : ",req.body);
    const buyer = req.body;

    kafka.make_request("signup", {type: "buyer", message: buyer},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Buyer created'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/login',function(req,res){
    console.log("Inside Buyer Login Post Request");
    console.log("Req Body : ",req.body);

    const buyer = req.body;

    kafka.make_request("login", {type: "buyer", message: buyer},
        function(err, result) {
            if(result){
                let user = {
                    email: buyer.email,
                    id: result.id,
                    userType: 'buyer'
                }
                var token = jwt.sign(user, secret, {
                    expiresIn: 10080 // in seconds
                });
                res.status(200).json({success: true, message: "Buyer Login successful", id: result.id, firstName: result.firstName, token: token});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateAddress',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Buyer Update Address Post Request");
    console.log("Req Query : ",req.query);

    let buyer = req.body;
    buyer.id = req.query.id;
    kafka.make_request("profile", {type: "updateBuyerAddress", message: buyer},
        function(err, result) {
            if(result){
                res.status(200).json({success:true, message:'Buyer address and phone updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateProfile',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Buyer Update Profile Post Request");
    console.log("Req Query : ",req.query);

    let buyer = req.body;
    buyer.id = req.query.id;
    kafka.make_request("profile", {type: "updateBuyerProfile", message: buyer},
        function(err, result) {
            if(result){
                res.status(200).json({success:true, message:'Buyer profile updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/firstName',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside buyer First Name Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getBuyerFirstName", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, firstName: result.fname});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/details',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside buyer Details Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getBuyerDetails", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, buyer: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/profilePic',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside buyer profile pic Get Request");
    console.log("Req Query : ",req.query);
 
    kafka.make_request("profile", {type: "getBuyerProfilePic", message: req.query.id},
        function(err, result) {
            if(result){
                res.sendFile(path.join(__dirname, `../uploads/${result.image}`));
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/searchRestaurants',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside buyer search restaurants pic Get Request");
    console.log("Request Query : ",req.query);

    const name = (req.query.menuItem) ? req.query.menuItem : "";
    kafka.make_request("buyer_order", {type: "searchRestaurants", message: name},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/placeOrder',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Buyer Place Order Post Request");
    console.log("Req Body : ",req.body);
    
    const order = req.body;
    kafka.make_request("buyer_order", {type: "createOrder", message: order},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/upcomingOrders',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Buyer Upcoming Orders Get Request");
    console.log("Req Query : ",req.query);
    
    kafka.make_request("buyer_order", {type: "getUpcomingOrders", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, orders:result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/pastOrders',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Buyer Past Orders Get Request");
    console.log("Req Query : ",req.query);
    
    kafka.make_request("buyer_order", {type: "getPastOrders", message: req.query.id},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, orders:result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/restaurantImage/:restaurantId',function(req,res){
    console.log("Inside restaurant profile pic Get Request");
    const restaurantId = (req.params.restaurantId) ? req.params.restaurantId : "";

    kafka.make_request("buyer_order", {type: "getRestaurantImage", message: restaurantId},
        function(err, result) {
            if(result){
                res.sendFile(path.join(__dirname, `../uploads/${result.image}`));
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

module.exports = router;