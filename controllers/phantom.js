const phantom = require('phantom');

const Utils = require('../common/util');

let createScreenshot = async (url, format, w, h) => {

    try {
        url = url.indexOf('http://') === -1 && url.indexOf('https://') === -1 ? 'https://' + url : url;
        let instance = await phantom.create();
        let page = await instance.createPage();

        await page.property('viewportSize', { width: w, height: h });
        await page.property('clipRect', { top: 0, left: 0, width: w, height: h });

        let status = await page.open(url);
        // console.log('status - ', status);

        if (status != 'success') {
            await instance.exit();
            return 'failed to generate thumbnail';
        }
        let renderResult = await page.renderBase64(format);
        await instance.exit();
        return renderResult;
    } catch (err) {
        return err;
    }
}

exports.generateScreenshot = async (req, res, next) => {
    let resBody = [];
    let objectsList = JSON.parse(req.body['records']);
    let options = JSON.parse(req.body['options']);

    await Utils.asyncForEach(objectsList, async (item) => {
        let base64Data = await createScreenshot(item.url, options['format'], options['width'], options['height']);
        let itemWrapper = {
            salesforce_id: item.salesforce_id,
            url: item.url,
            thumbnail_data: base64Data
        };
        resBody.push(itemWrapper);
    });
    res.status(200).json(resBody);
}