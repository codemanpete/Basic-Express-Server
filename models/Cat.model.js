const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema maps to a MongoDB collection and defines
// the shape of the documents within that collection.

const Cat = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
}, {
    // specifies the collection being mapped to.
    collection: 'cats'
});

// model is a wrapper around a schema
// schema is passed to create a model
// schema defines the structure of documents
// the model is the interface used to query/edit records
module.exports = mongoose.model('Cat', Cat);