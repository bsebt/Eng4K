// Execute the configuration file inside the config folder.
require('./config/config');
// Run the db.js code as well
require('./models/db');
// Run the configuration file as well for passport
require('./config/passportConfig');

// Require the rest of the modules.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const index = require('./routes/index.router');

// Define our app variable by calling the express() function.
var app = express();

// Port Number
const port = process.env.PORT || 8080;

// Define other dependencies.
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', index);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// Start Server
app.listen(port, () =>  console.log(`Server port: ${port}`));