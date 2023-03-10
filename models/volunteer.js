// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the volunteers collection
const volunteerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    }
)

module.exports = mongoose.model('Volunteer', volunteerSchema)