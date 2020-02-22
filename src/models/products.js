const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Products = new Schema({
    pid: {
        type: Number
    },
    name: {
        type: String
    },
    desc: {
        type: String
    }
}, {
    collection: 'Products'
});
module.exports = mongoose.model('Products', Products);
