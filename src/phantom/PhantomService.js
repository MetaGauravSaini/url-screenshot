
const phantom = require('phantom');

let createScreenshot = async () => {

    try {
        let instance = await phantom.create();
        let page = await instance.createPage();

        await page.property('viewportSize', { width: 1366, height: 768 });
        await page.property('clipRect', { top: 0, left: 0, width: 1366, height: 768 });

        /*
        await page.on("onResourceRequested", function(requestData) {
            console.info('requesting - ', requestData.url)
        });
        */

        let status = await page.open('https://www.point-of-reference.com/solutions/referenceedge/');
        console.log('status - ', status);

        let renderResult = await page.renderBase64('JPEG');
        //console.log('result - ', renderResult);

        await instance.exit();
        return renderResult;
    } catch (err) {
        return err;
    }
}

module.exports.createScreenshotFromUrl = createScreenshot;