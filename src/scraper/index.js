import { scrapeSixMusic } from './scrapeSixMusic.js';

const callEvery = async (callback, interval) => {
  await callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

const scrape = async () => {
  const { artist, title } = await scrapeSixMusic();
  console.log(artist, title);
};

callEvery(scrape, 5000);
