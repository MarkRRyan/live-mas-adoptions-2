// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the pets collection
const petSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        age: { type: String, required: true },
        about: { type: String, required: true },
        photo: {type: String, required: true }
    }
)

module.exports = mongoose.model('Pet', petSchema)