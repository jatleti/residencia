import puppeteer, { Browser } from 'puppeteer';

let browser: Browser;

export async function getPuppeteerInstance() {
    if (!browser || browser.connected === false) {
        browser = await puppeteer.launch({ headless: true });
        console.log('Puppeteer instance created');
    }
    return browser;
}
