const mongoose = require('./../mongoose');
const bcrypt = require('bcrypt');

/**
 * 
 * This regular expression checks the following:
 *
 * Initial part: Can contain letters (uppercase and lowercase), numbers, dots, underscores, 
 * percent signs, plus signs, and hyphens.
 * 
 * @ symbol: Mandatory.
 * 
 * Domain part: Can contain letters, numbers, dots, and hyphens.
 * 
 * TLD part: Can contain letters and must be at least two characters long.
 * 
 * This regular expression covers most common email addresses, 
 * but it’s important to remember that no regular expression can 
 * fully guarantee the validity of all possible email addresses.
 * 
 */

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema({
    //TODO:
    // Fill in the schema
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, 'Password needs to be at least 6 characters long!']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: 'Invalid role!'
        },
        default: 'user'
    }
});


//TODO:
//add a pre save hook to user schema and hash the password field with bcrypt
//alternatively, a set-method on that field could be used

//TODO:
//add a post save hook to user schema. Check if the error is duplicate key error (11000).
//If it is, override that error with a ValidationError that has a ValidatorError for the email field

// 1. Pre-save hook to hash the password
userSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            this.password = hashedPassword;  // Replace plain password with hashed one
            next();
        });
    } else {
        next();
    }
});

// 2. Post-save hook to handle duplicate email errors
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        // Handle the duplicate key error for the email field
        const validationError = new mongoose.Error.ValidationError(doc);
        validationError.errors['email'] = new mongoose.Error.ValidatorError({
            message: 'Email is already in use!',
            path: 'email',
            value: doc.email
        });
        next(validationError);
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
