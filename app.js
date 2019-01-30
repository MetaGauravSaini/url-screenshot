
const express = require('express');
const PhantomController = require('./src/phantom/PhantomController');

let app = express();
app.use('/api', PhantomController);

module.exports = app;