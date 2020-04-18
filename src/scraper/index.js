import { scrapeSixMusic } from './scrapeSixMusic.js';
import { createPlaylist } from '../spotify/api/playlists/createPlaylist.js';
import { getPlaylists } from '../spotify/api/playlists/getPlaylists.js';
import { findSong } from '../spotify/api/songs/findSong.js';

const callEvery = async (callback, interval) => {
  await callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

const PLAYLIST_NAME = '6 Music: Recently Played';

const scrape = async () => {
  const scrapedSong = await scrapeSixMusic();

  if (!scrapedSong) {
    return;
  }

  const { artist, title } = scrapedSong;

  const playlists = await getPlaylists();

  if (!playlists) {
    return;
  }

  const playlist = playlists.body.items.find(({ name }) => name === PLAYLIST_NAME);

  if (!playlist) {
    await createPlaylist({ name: PLAYLIST_NAME });
  }

  const song = await findSong({ artist, title });

  if (song) {
    console.log(song.id);
  }
};

callEvery(scrape, 5000);
