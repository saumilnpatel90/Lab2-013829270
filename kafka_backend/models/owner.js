const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    image: String,
    rest_name: String,
    rest_zip: String
});

module.exports = mongoose.model('Owners', ownerSchema);