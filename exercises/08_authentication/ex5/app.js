const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


(function() {
    const app = express();
    app.use(express.urlencoded({ extended: false }));

    // Routes
    app.use('/', indexRouter);
    app.use("/users", usersRouter);

    app.listen(3000);

    // If you need the log function, keep it here; otherwise, remove it.
    function log(error = "") {
        console.log(`Oops! Something went wrong: ${error}`);
    }

    module.exports = app;
})();
