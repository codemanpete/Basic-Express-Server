const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cat = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
}, {
    collection: 'cats'
});

module.exports = mongoose.model('Cat', Cat);