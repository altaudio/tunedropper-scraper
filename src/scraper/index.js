import puppeteer from 'puppeteer';

const callEvery = async (callback, interval) => {
  await callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

const scrape = async () => {
  const { NODE_ENV } = process.env;
  const browser = await puppeteer.launch({ headless: NODE_ENV !== 'dev' });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
};

callEvery(scrape, 5000);
