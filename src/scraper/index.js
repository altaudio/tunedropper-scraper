import { scrapeSixMusic } from './scrapeSixMusic.js';
import { createPlaylist } from '../spotify/api/playlists/createPlaylist.js';
import { getPlaylists } from '../spotify/api/playlists/getPlaylists.js';
import { findSong } from '../spotify/api/songs/findSong.js';
import { addSongToPlaylist } from '../spotify/api/playlists/addSongToPlaylist.js';
import { getPlaylist } from '../spotify/api/playlists/getPlaylist.js';
import { callEvery } from '../common/callEvery.js';

const PLAYLIST_NAME = '6 Music: Recently Played';

const SCRAPE_INTERVAL = 30000;

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

  let playlist;

  playlist = playlists.body.items.find(({ name }) => name === PLAYLIST_NAME);

  if (!playlist) {
    playlist = await createPlaylist({ name: PLAYLIST_NAME });
  }

  const fullPlaylist = await getPlaylist(playlist.id);

  if (!fullPlaylist) {
    return;
  }

  const song = await findSong({ artist, title });

  if (!song) {
    return;
  }

  const songIsOnPlaylist = fullPlaylist.tracks.items.find(track => {
    return track.track.uri === song.uri;
  });

  if (songIsOnPlaylist) {
    console.log(`Did not add ${song.uri} to playlist, as it's already on there!`);
    return null;
  }

  await addSongToPlaylist({ playlistId: playlist.id, songURI: song.uri });
};

callEvery(scrape, SCRAPE_INTERVAL);
