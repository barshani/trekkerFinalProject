const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 256,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
        role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
});

const User = mongoose.model('User', userSchema);

exports.User = User;
