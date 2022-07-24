import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const getAlbumTracks = async ({ id }) => {
  const { accessToken } = getTokens();

  try {
    const { body } = await request
      .get(`https://api.spotify.com/v1/albums/${id}/tracks`)
      .set('Authorization', `Bearer ${accessToken}`);

    console.log('Fetched album tracks');

    return body.items.map(item => item.uri);
  } catch (error) {
    console.log(`Error finding album tracks: ${error}`);

    return null;
  }
};
