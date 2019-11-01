const express = require('express');
const bodyParser = require('body-parser');

const ScreenshotRouter = require('./routes/screenshot');
const { notFound, unhandledException } = require('./middleware/error-handler');

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', ScreenshotRouter);

app.use(notFound);
app.use(unhandledException);

module.exports = app;