import { scrapeSixMusic } from './scrapeSixMusic.js';
import { createPlaylist } from '../spotify/playlists/createPlaylist.js';

const callEvery = async (callback, interval) => {
  await callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

const scrape = async () => {
  const { artist, title } = await scrapeSixMusic();

  createPlaylist({ name: '6 Music' });
  console.log(artist, title);
};

callEvery(scrape, 5000);
