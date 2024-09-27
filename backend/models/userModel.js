const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
    } 
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)