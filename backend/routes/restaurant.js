var express = require('express');
var router = express.Router();
const path = require('path');
var kafka = require('../kafka/client');
var passport = require("passport");
var jwt = require("jsonwebtoken");

router.post('/create',function(req,res){
    console.log("Inside Create Restaurant Post Request");
    console.log("Req Body : ",req.body);
    const restaurant = req.body;

    kafka.make_request("signup", {type: "restaurant", message: restaurant},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Restaurant created'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/addSection',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Add Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    kafka.make_request("restaurant_menu", {type: "addSection", message: section},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Section added', id: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/sections',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Sections Get Request");
    console.log("Req Query : ",req.query);

    kafka.make_request("restaurant_menu", {type: "getSections", message: req.query.ownerId},
        function(err, result) {
            if(result){
                let sections = result.sections.map(section => {
                    return {
                        _id: section._id,
                        name: section.name
                    }
                });
                res.status(200).json({success: true, sections: sections});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/deleteSection',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Delete Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    kafka.make_request("restaurant_menu", {type: "deleteSection", message: section},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Section deleted'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateSection',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Update Section Post Request");
    console.log("Req Body : ",req.body);
    const section = req.body;

    kafka.make_request("restaurant_menu", {type: "updateSection", message: section},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Section updated'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/addMenu',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Add Menu Post Request");
    console.log("Req Body : ",req.body);
    const menu = req.body;

    kafka.make_request("restaurant_menu", {type: "addMenu", message: menu},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Menu added', menuId: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/menus',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Menus Get Request");
    console.log("Req Query : ",req.query);
    
    kafka.make_request("restaurant_menu", {type: "getMenus", message: req.query.ownerId},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, sections: result.sections});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/menuItems/:restId',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Menu Items Get Request");
    console.log("Req Params : ",req.params);

    let restId = req.params.restId;
    kafka.make_request("buyer_order", {type: "getSections", message: restId},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, sections: result.sections});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/menuImage',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Menus pic Get Request");
    console.log("Req Query : ",req.query);
    
    res.sendFile(path.join(__dirname, `../uploads/${req.query.name}`));
});

router.post('/deleteMenu',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Delete Menu Post Request");
    console.log("Req Body : ",req.body);
    const menu = req.body;

    kafka.make_request("restaurant_menu", {type: "deleteMenu", message: menu},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Menu deleted'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateMenu',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Update Menu Post Request");
    console.log("Req Body : ",req.body);
    const menu = req.body;

    kafka.make_request("restaurant_menu", {type: "updateMenu", message: menu},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message:'Menu updated'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/allOrders',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant All Orders Get Request");
    console.log("Req Query : ",req.query);
    
    kafka.make_request("owner_order", {type: "getAllOrders", message: req.query.ownerId},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, orders: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateOrder',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Update Order Post Request");
    console.log("Req Body : ",req.body);
    const order = req.body;

    kafka.make_request("owner_order", {type: "updateOrder", message: order},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, message: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/details',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Details Get Request");
    console.log("Req Query : ",req.query);

    kafka.make_request("profile", {type: "getRestaurantDetails", message: req.query.ownerId},
        function(err, result) {
            if(result){
                res.status(200).json({success: true, restaurant: result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.get('/profilePic',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside restaurant profile pic Get Request");
    console.log("Req Query : ",req.query);

    kafka.make_request("profile", {type: "getRestaurantProfilePic", message: req.query.ownerId},
        function(err, result) {
            if(result){
                res.sendFile(path.join(__dirname, `../uploads/${result.image}`));
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/updateProfile',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside restaurant Update Profile Post Request");
    console.log("Req Query : ",req.query);

    let restaurant = req.body;
    restaurant.ownerId = req.query.ownerId;
    
    kafka.make_request("profile", {type: "updateRestaurantProfile", message: restaurant},
        function(err, result) {
            if(result){
                res.status(200).json({success:true, message:'Restaurant profile updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

router.post('/addMessage',passport.authenticate("jwt", { session: false }),function(req,res){
    console.log("Inside Restaurant Add Message Post Request");
    console.log("Req Body : ",req.body);
    const message = req.body;

    kafka.make_request("messaging", message,
        function(err, result) {
            if(result){
                res.status(200).json({success:true, message:result});
            }else{
                res.status(err.statusCode).json(err.info);
            }
    });
});

module.exports = router;