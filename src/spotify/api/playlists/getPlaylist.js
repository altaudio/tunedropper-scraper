import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const getPlaylist = async id => {
  const { accessToken } = getTokens();

  try {
    const response = await request
      .get(`https://api.spotify.com/v1/playlists/${id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    console.log(`Fetched playlist: ${id}`);

    return response.body;
  } catch (error) {
    console.log(`Error fetching playlist: ${error}`);

    return null;
  }
};
