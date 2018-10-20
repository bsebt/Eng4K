// Establish the connection to MongoDB.
const mongoose = require('mongoose');
// Encrypt passwords.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// We define the user schema object.
var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Name cannot be empty.'
    },
    email: {
        type: String,
        required: 'Email cannot be empty.',
        unique: true
    },
    password: {
        type: String,
        required: 'Password cannot be empty.',
        minlength: [6, 'Password must be at least 4 characters long.'],
    },
    saltSecret: String
});

// Validate Email.
userSchema.path('email').validate((val) => {
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(val);
}, 'Invalid Email Address.');

// Add pre-event for the schema
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

// Verify user password
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User', userSchema);