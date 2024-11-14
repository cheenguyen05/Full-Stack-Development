// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.renderLoginForm = (req, res) => {
    //Try to get validation errors out of session
    const errors = req.session.errors || [];
    //Clear validation errors from session
    delete req.session.errors;

    //Render the view, passing it (among other things) the possible validation errors
    return res.render('register', { title: `Register a new user`, errors });
};

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        await user.save();
        req.session.user = user;
        return res.redirect('/');
    } catch (error) {
        if(error.name === 'ValidationError') {
            const errors = [];
            for(let field in error.errors) {
                errors.push(error.errors[field].message);
            }

            //Store validation errors in the session
            req.session.errors = errors;
            //PRG, Post-Redirect-Get
            return res.redirect(`/register`);
        }
    }
};

exports.renderLoginForm = (req, res) => {
    //Try to get validation errors out of session
    const errors = req.session.errors || [];
    //Clear validation errors from session
    delete req.session.errors;

    //Render the view, passing it (among other things) the possible validation errors
    res.render('login', { title: 'Log in', errors });
};

exports.login = async (req, res) => {
    //Authenticate the user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        req.session.errors = ['These credentials do not match our records.'];
        return res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();

    return res.redirect('/login');
};