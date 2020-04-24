import superagent from 'superagent';
import btoa from 'btoa';
import { read } from '../../../database/read.js';

export const refreshAccessToken = async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const { refreshToken: oldRefreshToken } = read(['refreshToken']);

  try {
    const { body } = await superagent
      .post('https://accounts.spotify.com/api/token')
      .set('Authorization', `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`)
      .send('grant_type=refresh_token')
      .send(`refresh_token=${oldRefreshToken}`);

    console.log('Refreshed access: tokens');
    return body.accessToken;
  } catch (error) {
    console.log(`Error refreshing tokens: ${error}`);
    return null;
  }
};
