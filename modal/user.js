const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    avatarNumber: { type: Number, required: true },
    gender: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    signupTime: { type: String, required: true },
    phone: { type: String, required: true },
    loggedIn: []
});

module.exports = mongoose.model('User', userSchema);