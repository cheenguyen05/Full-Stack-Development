// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Render login form
exports.renderLoginForm = (req, res) => {
    const errors = req.session.errors || [];
    delete req.session.errors;

    return res.render('login', { title: 'Log in', errors });
};

// Authenticate user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        req.session.errors = ['These credentials do not match our records.'];
        return res.redirect('/login');
    }
};

// Log out user
exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
};

// Render registration form
exports.renderRegisterForm = (req, res) => {
    const errors = req.session.errors || [];
    delete req.session.errors;

    return res.render('register', { title: 'Register a new user', errors });
};

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        await user.save();
        req.session.user = user;
        return res.redirect('/');
    } catch (error) {
        if (error.name === 'ValidationError') {
            req.session.errors = Object.values(error.errors).map(e => e.message);
            return res.redirect('/register');
        }
    }
};
