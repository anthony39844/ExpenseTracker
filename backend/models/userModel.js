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
    },
    password: {
        type: String,
        required: true,
        trim: true,
    } 
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)