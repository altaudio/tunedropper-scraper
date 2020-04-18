import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const findSong = async ({ title, artist }) => {
  const { accessToken } = getTokens();

  try {
    const {
      body: { tracks }
    } = await request
      .get(`https://api.spotify.com/v1/search?q=track:${title}%20artist:${artist}&type=track`)
      .set('Authorization', `Bearer ${accessToken}`);

    console.log('Fetched song');

    if (!tracks || !tracks.items || tracks.items === 0) {
      return null;
    }

    return tracks.items[0];
  } catch (error) {
    console.log(`Error finding song: ${error}`);

    return null;
  }
};
