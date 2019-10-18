
const express = require('express');
const bodyParser = require('body-parser');
const PhantomService = require('./PhantomService');

let router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.status(200).send('inside get route.');
});

router.post('/capture-screen', async (req, res) => {
    let resBody = [];
    let objectsList = JSON.parse(req.body['records']);
    let options = JSON.parse(req.body['options']);

    await asyncForEach(objectsList, async (item) => {
        let base64Data = await PhantomService.createScreenshotFromUrl(item.url, options['format'], options['width'], options['height']);
        let itemWrapper = {
            salesforce_id: item.salesforce_id,
            url: item.url,
            thumbnail_data: base64Data
        };
        resBody.push(itemWrapper);
    });
    res.status(200).json(resBody);
});

async function asyncForEach(array, callback) {

    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = router;