import _ from 'lodash';
import { scrapeSixMusic } from './scrapeSixMusic.js';
import { createPlaylist } from '../spotify/api/playlists/createPlaylist.js';
import { getPlaylists } from '../spotify/api/playlists/getPlaylists.js';
import { findAlbum } from '../spotify/api/albums/findSong.js';
import { addSongToPlaylist } from '../spotify/api/playlists/addSongToPlaylist.js';
import { getPlaylist } from '../spotify/api/playlists/getPlaylist.js';
import { callEvery } from '../common/callEvery.js';
import { scrapeResidentMusic } from './scrapeResidentMusic.js';
import { getAlbumTracks } from '../spotify/api/albums/getAlbumTracks.js';
import { findSong } from '../spotify/api/songs/findSong.js';

const PLAYLIST_NAME = '6 Music: Recently Played';

const SCRAPE_INTERVAL = 30000;

const sixMusic = async () => {
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

  console.log(`Adding song to playlist: ${song.name}`);
  await addSongToPlaylist({ playlistId: playlist.id, songURIs: [song.uri] });
};

const residentMusic = async () => {
  const { listTitle, albums } = await scrapeResidentMusic();

  const playlists = await getPlaylists();

  if (!playlists) {
    return;
  }

  let playlist;

  const PLAYLIST_NAME_RESIDENT = `Resident Music - ${listTitle}`;

  playlist = playlists.body.items.find(({ name }) => name === PLAYLIST_NAME_RESIDENT);

  if (playlist) {
    return;
  }

  playlist = await createPlaylist({ name: PLAYLIST_NAME_RESIDENT });

  const albumTracks = await Promise.all(
    albums.map(async album => {
      const foundAlbum = await findAlbum({
        artist: encodeURIComponent(album.artist),
        title: encodeURIComponent(album.title)
      });
      const albumTracks = await getAlbumTracks({ id: foundAlbum });

      return albumTracks;
    })
  );

  const allTracks = _.chain(albumTracks)
    .flatten()
    .shuffle()
    .filter(uri => uri !== null)
    .chunk(100)
    .value();

  await Promise.all(
    allTracks.map(async tracksChunk => {
      await addSongToPlaylist({ songURIs: tracksChunk, playlistId: playlist.id });
    })
  );
};

const scrape = async () => {
  await sixMusic();
  await residentMusic();
};

callEvery(scrape, SCRAPE_INTERVAL);
