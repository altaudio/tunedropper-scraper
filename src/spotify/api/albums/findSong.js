import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const findAlbum = async ({ title, artist }) => {
  const { accessToken } = getTokens();

  try {
    const { body } = await request
      .get(`https://api.spotify.com/v1/search?q=album:${title}%20artist:${artist}&type=album`)
      .set('Authorization', `Bearer ${accessToken}`);

    console.log('Fetched album');

    return body.albums.items[0].id;
  } catch (error) {
    console.log(`Error finding album: ${error}`);

    return null;
  }
};
