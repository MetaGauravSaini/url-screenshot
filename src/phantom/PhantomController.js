
const express = require('express');
const bodyParser = require('body-parser');
const PhantomService = require('./PhantomService');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.status(200).send('inside get route.');
    console.log('inside get route.');
});

router.post('/capture-screen', async (req, res) => {
    let base64Data = await PhantomService.createScreenshotFromUrl();
    res.status(200).send(base64Data);
    console.log('inside post route.');
});

module.exports = router;