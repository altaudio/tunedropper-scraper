import superagent from 'superagent';
import btoa from 'btoa';
import { setTokens } from '../tokens.js';

export const authorized = async (request, response) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;

  const error = request.query.error;
  if (error) {
    console.log(`Authorization failed: ${error}`);
    return response.sendStatus(500);
  }

  const authorizationCode = request.query.code;
  response.sendStatus(200);

  try {
    const {
      body: { access_token, refresh_token }
    } = await superagent
      .post('https://accounts.spotify.com/api/token')
      .set('Authorization', `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`)
      .send('grant_type=authorization_code')
      .send(`code=${authorizationCode}`)
      .send(`redirect_uri=${encodeURIComponent(REDIRECT_URI)}`);

    setTokens({ accessToken: access_token, refreshToken: refresh_token });
  } catch (error) {
    console.log(`Error gettings access tokens: ${error}`);
  }
};
