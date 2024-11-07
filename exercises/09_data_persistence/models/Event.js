const mongoose = require('./../mongoose');

const eventSchema = new mongoose.Schema({
    //TODO: Fill in the schema
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: 1,
        maxlength: 50
    },
    date: {
        type: String,
        required: [true, 'Date is required!']
    },
    status: {
        type: String,
        enum: {
            values: ['planned', 'completed', 'cancelled', 'rejected'],
            message: 'Status must be either planned, completed, cancelled, or rejected!'
        },
        default: 'planned'
    },
    description: {
        type: String
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
