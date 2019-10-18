
const phantom = require('phantom');

let createScreenshot = async (url, format, w, h) => {

    try {
        url = url.indexOf('http://') === -1 && url.indexOf('https://') === -1 ? 'https://' + url : url;
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

module.exports.createScreenshotFromUrl = createScreenshot;