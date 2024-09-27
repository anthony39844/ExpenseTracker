const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
        minLength: 2
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    } 
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)