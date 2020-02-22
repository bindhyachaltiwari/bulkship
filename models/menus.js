const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menus = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true

    }
}, {
    collection: 'users'
});
module.exports = mongoose.model('users', users);