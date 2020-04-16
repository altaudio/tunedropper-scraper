import puppeteer from 'puppeteer';

const getTextByClassName = async (page, className) => {
  const elements = await page.$$(className);
  const element = elements[0];
  const textElement = await element.getProperty('textContent');
  const text = await textElement.jsonValue();

  return text;
};

export const scrapeSixMusic = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.bbc.co.uk/sounds/play/live:bbc_6music');

  const artistSelector = '.sc-c-track__artist';
  await page.waitFor(() => document.querySelectorAll('.sc-c-track__artist').length === 4);

  const artist = await getTextByClassName(page, artistSelector);
  const title = await getTextByClassName(page, '.sc-c-track__title');

  await browser.close();

  return { artist, title };
};
