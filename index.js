const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const  scrap = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--autoplay-policy=no-user-gesture-required', '--window-size=1920,1080'],
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(url);
    const html = await page.content();

    const $ = cheerio.load(html);

    const productTile = $('#productTitle').text();
    const productPrice = $('#price_inside_buybox').text();

    console.table([{ title: productTile.trim().substring(0, 20), price: productPrice.trim() }]);

    await browser.close();
}

(async() => {
    try {
        await scrap('https://www.amazon.com/Acer-Monitor-FreeSync-Technology-ZeroFrame/dp/B0B6DFG1FQ/ref=sr_1_16');
    } catch (e) {
        console.log(e);
    }
})();