
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


module.exports = router;