import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const addSongToPlaylist = async ({ songURIs, playlistId }) => {
  const { accessToken } = getTokens();

  try {
    const { body } = await request
      .post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send(`{"uris": [${songURIs.map(uri => `"${uri}"`)}], "position": 0}`);

    console.log(`Added song to playlists`);

    return body;
  } catch (error) {
    console.log(error);
    console.log(`Error adding song to playlist: ${error}`);

    return null;
  }
};
