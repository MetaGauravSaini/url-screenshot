const express = require('express');
const router = express.Router();

const PhantomController = require('../controllers/phantom');

router.post('/capture-screen', PhantomController.generateScreenshot);

module.exports = router;