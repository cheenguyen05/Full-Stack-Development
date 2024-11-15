const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Case 1: Missing or malformed Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Validate the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded payload to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Case 2: Invalid or expired token
        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
};
