// Require the Mongoose package & your env configuration
require('dotenv').config()
const mongoose = reuquire('mongoose');
const mongodbUri = process.env.mongodbUri
// Create an immediately invoked async function
// It will wait for Mongoose to connect to MongoDB Atlas
(async function() {
    await mongoose.connect(mongodbUri);
    console.log('Mongoose is connected to', mongodbUri);
})().catch(err => console.log('MongoDB connection erron:\n' + err))