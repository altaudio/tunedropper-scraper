import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const getPlaylists = async () => {
  const { accessToken } = getTokens();

  try {
    const playlists = await request
      .get(`https://api.spotify.com/v1/me/playlists`)
      .set('Authorization', `Bearer ${accessToken}`);

    console.log('Fetched playlists for user');

    return playlists;
  } catch (error) {
    console.log(error);

    return null;
  }
};
