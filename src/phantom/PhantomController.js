
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

router.post('/capture-screen', (req, res) => {
    let resBody = {};
    console.log('req body - ', req.body);
    let objectsList = JSON.parse(req.body);
    console.log('objectsList - ', objectsList);

    objectsList.forEach(async (item) => {
        let base64Data = await PhantomService.createScreenshotFromUrl(item.url);
        resBody[item.id] = base64Data;
    });
    res.status(200).send(JSON.stringify(resBody));
    console.log('inside post route.');
});

module.exports = router;