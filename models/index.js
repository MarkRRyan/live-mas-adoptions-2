// Require the Mongoose package & your env configuration
require('dotenv').config()
const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODBURI;
// Create an immediately invoked async function
// It will wait for Mongoose to connect to MongoDB Atlas
(async function() {
    await mongoose.connect(mongodbUri);
    console.log('Mongoose is connected to', mongodbUri);
})().catch(err => console.log('MongoDB connection erron:\n' + err))

module.exports = {
    Pet: require('./pet'),
    Volunteer: require('./volunteer')
}