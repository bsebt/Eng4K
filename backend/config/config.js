// Check the environment we're on
var env = process.env.NODE_ENV || 'development';

// Fetch the configuration data from the `config.json` file.
var config = require('./config.json');
var environmentConfig = config[env];

// Add the environment configuration values to process.env
Object.keys(environmentConfig).forEach(key => process.env[key] = environmentConfig[key]);
