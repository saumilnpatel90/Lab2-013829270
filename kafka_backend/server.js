var connection =  new require('./kafka/connection');
const {database} = require('./config/config');
var mongoose = require('mongoose');
var SignUp = require('./services/signup');
var Login = require('./services/login');
var Profile = require('./services/profile');
var BuyerOrder = require('./services/buyer_order');
var Passport = require('./services/passport');
var Messaging = require('./services/messaging');
var RestaurantMenu = require('./services/restaurant_menu');
var OwnerOrder = require('./services/owner_order');

const connectDB = async () => {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};
connectDB();

function handleTopicRequest(topic_name,fname){
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        switch (topic_name) {
            case "signup":
              SignUp.signupService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "login":
              Login.loginService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "profile":
              Profile.profileService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "buyer_order":
              BuyerOrder.buyer_orderService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "passport":
              Passport.passportService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "messaging":
              Messaging.messagingService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "restaurant_menu":
              RestaurantMenu.restaurant_menuService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
            case "owner_order":
              OwnerOrder.owner_orderService(data.data, function(err, res) {
                response(data, res, err, producer);
                return;
              });
              break;
          }        
    });
}

function response(data, res, err, producer) {
    console.log("after handle", res);
    var payloads = [
      {
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: res,
          err: err
        }),
        partition: 0
      }
    ];
    producer.send(payloads, function(err, data) {
        if(err){
            console.log("error when producer sending data", err);
        } else {
            console.log("producer send", data);
        }
    });
    return;
  }

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book",Books)
handleTopicRequest("signup", SignUp);
handleTopicRequest("login", Login);
handleTopicRequest("profile", Profile);
handleTopicRequest("buyer_order", BuyerOrder);
handleTopicRequest("passport", Passport);
handleTopicRequest("messaging", Messaging);
handleTopicRequest("restaurant_menu", RestaurantMenu);
handleTopicRequest("owner_order", OwnerOrder);