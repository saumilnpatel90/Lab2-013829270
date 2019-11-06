const mongoose = require('mongoose')

const buyerSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: Number,
    image: String,
    street: String,
    unit_no: String,
    city: String,
    state: String,
    zip_code: String
});

module.exports = mongoose.model('Buyers', buyerSchema);