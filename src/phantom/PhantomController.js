
const express = require('express');
const bodyParser = require('body-parser');
const PhantomService = require('./PhantomService');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));  // for url encoded bodies
router.use(bodyParser.json());    // for json encoded bodies

router.get('/', (req, res) => {
    res.status(200).send('inside get route.');
    console.log('inside get route.');
});

router.post('/capture-screen', async (req, res) => {
    console.log('inside post route.');
    let resBody = {};
    let objectsList = JSON.parse(req.body);

    objectsList.forEach(item => {
        let base64Data = await PhantomService.createScreenshotFromUrl(item.url);
        resBody[item.id] = base64Data;
    });
    res.status(200).send(JSON.stringify(resBody));
});

module.exports = router;