const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('CiI1qd4zu0Hn3ZQGJNtAFglzmYeRaGeO');

var Schema = mongoose.Schema;
var userDetails = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true
    },
    clientType: {
        type: String,
        required: true
    },
    managerRoles: {
        type: Object,
        required: false
    },
    clientDisplay: {
        type: Object,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false
    }
}, {
    collection: 'userDetails'
});
userDetails.pre('save', async function (next) {
    this.password = await cryptr.encrypt(this.password);
    next();
});
module.exports = mongoose.model('userDetails', userDetails);