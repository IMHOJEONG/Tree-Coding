const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.naver.com');
    await page.screenshot({ path: 'test.png'});
    await browser.close();
})();

(async ()=> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com',{
        waitUntil: 'networkidle2'
    });
    await page.pdf({
        path: 'test.pdf', format: 'A4'
    });
})();

(async ()=> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.naver.com");

    const dimensions = await page.evaluate(() =>{
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        };
    });

    console.log('Dimensions:', dimensions);

    await browser.close();

})();