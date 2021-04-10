const puppeteer = require('puppeteer');
const fs = require("fs");
const getTweetsAxios = require('./scraper.v2');

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function run (pagesToScrape, handle) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pagesToScrape) {
                pagesToScrape = 1;
            }
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setViewport({
                width: 1200,
                height: 10000
            });
            await page.goto("https://twitter.com/" + handle);
            let currentPage = 1;
            let urls = [];
            while (currentPage <= pagesToScrape) {
                await page.waitForTimeout(5000);
                let newUrls = await page.evaluate(() => {
                    let results = [];
                    let items = document.querySelectorAll('article');
                    items.forEach((item) => {
                        let val = item.innerHTML.split("<div class=\"css-1dbjc4n r-18u37iz r-1wtj0ep r-zl2h9q\"></div></div></div><div class=\"css-1dbjc4n\"><div class=\"css-1dbjc4n\"><div lang=\"en\" dir=\"auto\" class=\"css-901oao r-18jsvk2 r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0\"><span class=\"css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0\">")
                        [1];
                        val = typeof val !== "undefined" ? val.split("</")[0] : "";
                        results.push({
                            text: val
                        });
                    });
                    return results;
                });
                urls = urls.concat(newUrls);
               
                if (currentPage < pagesToScrape) {
                    await autoScroll(page);
                }
                currentPage++;
            }
            browser.close();
            console.log(urls.length);
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}

// run(1).then(el => {fs.writeFileSync("data.json", JSON.stringify(el));}).catch(console.error);

module.exports = async function(handle) {
    try {
        return await run(1, handle).then(el => el);       
    } catch (error) {
        return null;
    }
}