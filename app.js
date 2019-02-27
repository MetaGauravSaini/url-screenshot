
const express = require('express');
const PhantomController = require('./src/phantom/PhantomController');

let app = express();
app.use('/api', PhantomController);

app.use((req, res, next) => {
    const err = new Error('not found!!');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message
    });
});

module.exports = app;