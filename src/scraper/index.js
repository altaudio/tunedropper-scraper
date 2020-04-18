import { scrapeSixMusic } from './scrapeSixMusic.js';
import { createPlaylist } from '../spotify/api/playlists/createPlaylist.js';
import { getPlaylists } from '../spotify/api/playlists/getPlaylists.js';
import { findSong } from '../spotify/api/songs/findSong.js';
import { addSongToPlaylist } from '../spotify/api/playlists/addSongToPlaylist.js';

const callEvery = async (callback, interval) => {
  await callback();
  setTimeout(() => callEvery(callback, interval), interval);
};

const PLAYLIST_NAME = '6 Music: Recently Played';

const scrape = async () => {
  const scrapedSong = await scrapeSixMusic();
  // const scrapedSong = { artist: 'Prince', title: 'Kiss'}

  if (!scrapedSong) {
    return;
  }

  const { artist, title } = scrapedSong;

  const playlists = await getPlaylists();

  if (!playlists) {
    return;
  }

  let playlist;

  playlist = playlists.body.items.find(({ name }) => name === PLAYLIST_NAME);

  if (!playlist) {
    playlist = await createPlaylist({ name: PLAYLIST_NAME });
  }

  const song = await findSong({ artist, title });

  if (!song) {
    return;
  }

  await addSongToPlaylist({ playlistId: playlist.id, songURI: song.uri });
};

callEvery(scrape, 5000);
