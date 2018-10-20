// Establish the connection to MongoDB.
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    // If there is no error.
    if (!err) {
        console.log('MongoDB connection was successful.');
    } else {
        // Otherwise print the error message in string form.
        console.log('Failed to connect:');
    }
});

// Import the user schema module.
require('./user.model');