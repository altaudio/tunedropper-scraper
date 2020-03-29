import superagent from 'superagent';
import btoa from 'btoa';

export const getTokens = async authorizationCode => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;

  const {
    body: { access_token: accessToken, refresh_token: refreshToken }
  } = await superagent
    .post('https://accounts.spotify.com/api/token')
    .set('Authorization', `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`)
    .send('grant_type=authorization_code')
    .send(`code=${authorizationCode}`)
    .send(`redirect_uri=${encodeURIComponent(REDIRECT_URI)}`);

  return { accessToken, refreshToken };
};
