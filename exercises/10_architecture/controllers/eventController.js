// controllers/eventController.js
const Event = require('../models/Event');

// Show all events
exports.all = async (req, res) => {
    const user = req.session.user;
    const events = await Event.find();
    return res.render('events/index', { title: 'Dashboard', user, events });
};

// Show form to create a new event
exports.create = (req, res) => {
    const user = req.session.user;
    const errors = req.session.errors || [];
    delete req.session.errors;

    const event = req.session.event || { name: "", date: "", description: "", status: "planned" };
    delete req.session.event;

    return res.render('events/create', { title: 'Create a new event', user, event, errors });
};

// Store a new event
exports.store = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        return res.redirect('/events');
    } catch (error) {
        if (error.name === 'ValidationError') {
            req.session.errors = Object.values(error.errors).map(e => e.message);
            return res.redirect('/events/create');
        }
    }
};

// Show form to edit an event
exports.edit = async (req, res) => {
    const user = req.session.user;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send();

    const errors = req.session.errors || [];
    delete req.session.errors;

    return res.render('events/edit', { title: `Edit ${req.params.id}`, user, event, errors });
};

// Update an event
exports.update = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: false, runValidators: true });
        if (!event) return res.status(404).send();
        return res.redirect('/events');
    } catch (error) {
        if (error.name === 'ValidationError') {
            req.session.errors = Object.values(error.errors).map(e => e.message);
            return res.redirect(`/events/${req.params.id}`);
        }
    }
};

// Delete an event
exports.delete = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    return res.redirect('/events');
};
