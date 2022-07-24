import puppeteer from 'puppeteer';

const getTextByClassName = async (page, className) => {
  const elements = await page.$$(className);
  const element = elements[0];
  const textElement = await element.getProperty('textContent');
  const text = await textElement.jsonValue();

  return text;
};

const getMultipleTextByClassName = async (page, className) => {
  const elements = await page.$$(className);

  const texts = Promise.all(
    elements.map(async element => {
      const textElement = await element.getProperty('textContent');
      const text = await textElement.jsonValue();

      return text;
    })
  );

  return texts;
};

export const scrapeResidentMusic = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.resident-music.com/');

  const [viewAllLink] = await page.$x("//a[contains(text(), 'View all')]");

  await viewAllLink.click();

  await page.waitForSelector('h1.list-title');

  const listTitle = await getTextByClassName(page, '.list-title');

  const artists = await getMultipleTextByClassName(page, '.title');
  const tracks = await getMultipleTextByClassName(page, '.artist');

  const albums = artists.map((artist, index) => ({ artist, track: tracks[index] }));

  await browser.close();

  return { listTitle, albums };
};
