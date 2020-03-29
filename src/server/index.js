import express from 'express';
import superagent from 'superagent';
import dotenv from 'dotenv';
import btoa from 'btoa';
import { setTokens } from './tokens.js';
import { authorize } from './routes/authorize.js';

dotenv.config();

const app = express();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, REDIRECT_URI } = process.env;

const redirectURI = encodeURIComponent(`${REDIRECT_URI}/authorized`);

app.get('/authorize', authorize);

app.get('/authorized', async (request, response) => {
  const error = request.query.error;
  if (error) {
    console.log(`Authorization failed: ${error}`);
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
      .send(`redirect_uri=${redirectURI}`);

    setTokens({ accessToken: access_token, refreshToken: refresh_token });
  } catch (error) {
    console.log(`Error gettings access tokens: ${error}`);
  }
});

const port = 8080;
console.log(`Listening on port ${port}`);
app.listen(port);
