import { scrapeSixMusic } from './scrapeSixMusic.js';
import { createPlaylist } from '../spotify/api/playlists/createPlaylist.js';

const callEvery = async (callback, interval) => {
  await callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

const scrape = async () => {
  const scrapedSong = await scrapeSixMusic();

  if (!scrapedSong) {
    return;
  }

  const { artist, title } = scrapedSong;

  createPlaylist({ name: '6 Music' });
  console.log(artist, title);
};

callEvery(scrape, 5000);
