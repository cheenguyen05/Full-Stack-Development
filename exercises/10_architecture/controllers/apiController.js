const Event = require('../models/Event');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.all = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events.' });
    }
};

exports.show = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the event.' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const eventData = req.body;

        let event = await Event.findById(id);
        if (event) {
            // Update existing event
            Object.assign(event, eventData);
            await event.save();
            return res.json(event);
        } else {
            // Create a new event
            event = new Event(eventData);
            await event.save();
            return res.status(201).json(event);
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to update or create event.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // Create a token
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed.' });
    }
};
