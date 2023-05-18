const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        default: Math.floor(Math.random() * 100)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;