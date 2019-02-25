/**
 * @author [siwilizhao]
 * @email [siwilizhao@gmail.com]
 * @create date 2019-02-25 16:00:16
 * @modify date 2019-02-25 16:00:16
 * @desc [temp mail for nodejs]
 */
const puppeteer = require('puppeteer');
(async () => {
    const ioredis = require('ioredis')
    const redis = new ioredis()

    const { CACHE_TEMPMAIL_LIST } = require('./config')
    const uniquestring = require('siwi-uniquestring')
    const browser = await puppeteer.launch({
        executablePath: './chrome/mac-624492/Chromium.app/Contents/MacOS/Chromium',
        headless: false
    });
    const page = await browser.newPage()
    await page.goto('https://temp-mail.org/zh/option/change')
    const domains = [
        '@ask-mail.com',
        '@digital-message.com',
        '@digital-message.com',
        '@directmail24.net',
        '@eoffice.top',
        '@freehotmail.net',
        '@mail-hub.info',
        '@mail-share.com',
        '@nextmail.info',
        '@webmail24.top'
    ]
    const mail = await uniquestring.random(10)
    const index = Math.floor(Math.random()* 10)
    await redis.lpush(CACHE_TEMPMAIL_LIST, `${mail}${domains[index]}`)

    await page.waitForSelector('#mail.form-control')
    await page.type('#mail.form-control', mail)
    await page.waitForSelector('#domain')
    await page.select('#domain', domains[index])
    await page.waitForSelector('#postbut')
    await page.click('#postbut')
    await page.close()
})();