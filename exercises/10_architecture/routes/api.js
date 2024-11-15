const express = require('express');
const router = express.Router();
const tokenAuthMiddleware = require('../middleware/tokenAuthMiddleware');
const apiController = require('../controllers/apiController');

// Map routes to controller methods
router.get('/api/events', tokenAuthMiddleware, apiController.all);
router.get('/api/events/:id', tokenAuthMiddleware, apiController.show);
router.put('/api/events/:id', tokenAuthMiddleware, apiController.update);
router.post('/api/login', apiController.login);

module.exports = router;
