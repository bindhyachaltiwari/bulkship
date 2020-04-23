const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userDetails = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    displayName:{
        type: String,
        required: true,
        trim: true
    },
    companyName:{
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
		type: Array,
		required: false
	}
}, {
    collection: 'userDetails'
});
module.exports = mongoose.model('userDetails', userDetails);