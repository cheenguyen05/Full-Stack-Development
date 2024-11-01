const express = require('express');
const router = express.Router();

const pageTitle = "Users endpoint"; // Changed to camelCase
const theUsersList = [ // Changed to camelCase
    { id: 1, name: "Matti Meikäläinen", address: { street: "Katu 1", city: "Helsinki", postalCode: "00100" }, email: "matti.meikalainen@example.com" },
    { id: 2, name: "Liisa Virtanen", address: { street: "Tie 2", city: "Espoo", postalCode: "02100" }, email: "liisa.virtanen@example.com" },
    { id: 3, name: "Pekka Peloton", address: { street: "Polku 3", city: "Tampere", postalCode: "33100" }, email: "pekka.peloton@example.com" }
];

// Users route
router.get('/', (req, res) => {
    res.send(theUsersList);
});

router.get('/:id', (req, res) => {
    const user = theUsersList.find(u => u.id === parseInt(req.params.id, 10)); // Renamed variable to avoid shadowing
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ error: "User not found" });
    }
});

module.exports = router;
