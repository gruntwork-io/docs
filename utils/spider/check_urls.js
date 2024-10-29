const puppeteer = require('puppeteer');
const fs = require('fs');
const async = require('async');

async function checkForPageNotFound(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('body');

    const pageNotFound = await page.evaluate(() => {
        return document.body.innerText.includes('We could not find what you were looking for'); // Replace with your specific error message
    });

    await browser.close();
    return pageNotFound;
}

const main = async () => {
    const urls = fs.readFileSync('filtered_urls_list.txt').toString().split("\n").map(url => url.replace('https://docs.gruntwork.io', 'http://localhost:3000'));
    console.log({ urls })
    const results = {};
    const brokenLinks = [];
    const task = async (url) => {
        if (!url) return
        const is404 = await checkForPageNotFound(url);
        console.log({ url, is404 });
        results[url] = {is404};
        if (is404) {
            brokenLinks.push(url);
        }
    }
    await async.eachLimit(urls, 25, task);
    console.log({ results });
    console.log({ brokenLinks })
}
main();