
const phantom = require('phantom');

let createScreenshot = async (url, format, w, h) => {

    try {
        let instance = await phantom.create();
        let page = await instance.createPage();

        await page.property('viewportSize', { width: w, height: h });
        await page.property('clipRect', { top: 0, left: 0, width: w, height: h });

        /*
        await page.on("onResourceRequested", function(requestData) {
            console.info('requesting - ', requestData.url)
        });
        */

        let status = await page.open(url);
        console.log('status - ', status);

        let renderResult = await page.renderBase64(format);
        //console.log('result - ', renderResult);

        await instance.exit();
        return renderResult;
    } catch (err) {
        return err;
    }
}

module.exports.createScreenshotFromUrl = createScreenshot;