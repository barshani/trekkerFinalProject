const mongoose = require('mongoose');
const { type } = require('os');
const attractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    description: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    imageUrl:{
        type: String,
        required: true,
        unique: true,
        minlength: 6,
    },
    mapUrl: {
        type: String,
        required: true,
        minlength: 6,
    },
    details: {
        type: String,
        required: true,
        minlength: 6,
    },
    openingHours: {
        type: String,
        required: true,
        minlength: 9,
    },
    aproved: {
        type: Boolean,
        default: false,
    }
});

const Attraction = mongoose.model('Attraction', attractionSchema);

exports.Attraction = Attraction;
