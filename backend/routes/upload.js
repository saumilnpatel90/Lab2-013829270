var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var kafka = require('../kafka/client');
var passport = require("passport");
var jwt = require("jsonwebtoken");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
var upload = multer({ storage: storage }).single('image');

router.post('/buyer-profile-image', passport.authenticate("jwt", { session: false }),(req, res) => {
    console.log("Inside buyer profile pic post Request");

    upload(req, res, function(err){
        if(err){
            res.status(500).send({message: `Buyer Image upload failed due to internal issue. ${err}`});
            return;
        }

        let buyer = {
            id: req.body.id,
            image: req.file.filename
        }
        kafka.make_request("profile", {type: "updateBuyerImage", message: buyer},
        function(err, result) {
            if(result){
                console.log("Buyer image updated succesfully");
                res.status(200).send({message:'Buyer image updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
        }); 
    });
});

router.post('/owner-profile-image', passport.authenticate("jwt", { session: false }),(req, res) => {
    console.log("Inside owner profile pic post Request");

    upload(req, res, function(err){
        if(err){
            res.status(500).send({message: `Owner Image upload failed due to internal issue. ${err}`});
            return;
        }

        let owner = {
            id: req.body.id,
            image: req.file.filename
        }
        kafka.make_request("profile", {type: "updateOwnerImage", message: owner},
        function(err, result) {
            if(result){
                console.log("Owner image updated succesfully");
                res.status(200).send({message:'Owner image updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
        });
    });
});

router.post('/restaurant-profile-image', passport.authenticate("jwt", { session: false }),(req, res) => {
    upload(req, res, function(err){
        if(err){
            res.status(500).send({message: `Restaurant Image upload failed due to internal issue. ${err}`});
            return;
        }

        let restaurant = {
            ownerId: req.body.ownerId,
            image: req.file.filename
        }
        kafka.make_request("profile", {type: "updateRestaurantImage", message: restaurant},
        function(err, result) {
            if(result){
                console.log("Restaurant image updated succesfully");
                res.status(200).send({message:'Restaurant image updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
        });       
    });
});

router.post('/menu-image', passport.authenticate("jwt", { session: false }),(req, res) => {
    upload(req, res, function(err){
        if(err){
            res.status(500).send({message: `Menu Image upload failed due to internal issue. ${err}`});
            return;
        }

        let menu = {
            id: req.body.menuId,
            sectionId:req.body.sectionId,
            ownerId: req.body.ownerId,
            image: req.file.filename
        }
        kafka.make_request("restaurant_menu", {type: "updateMenuImage", message: menu},
        function(err, result) {
            if(result){
                res.status(200).send({message:'Menu image updated succesfully.'});
            }else{
                res.status(err.statusCode).json(err.info);
            }
        });
    });
});

module.exports = router;