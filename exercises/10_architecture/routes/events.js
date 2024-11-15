// routes/events.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const sessionAuthMiddleware = require('../middleware/sessionAuthMiddleware');

// Route mappings
router.get('/events', eventController.all);
router.get('/events/create', eventController.create);
router.post('/events', eventController.store);
router.get('/events/:id', eventController.edit);
router.post('/events/:id', eventController.update);
router.post('/events/:id/delete', eventController.delete);

module.exports = router;
