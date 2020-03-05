import express from 'express';
import superagent from 'superagent';
import dotenv from 'dotenv';
import btoa from 'btoa';

dotenv.config();

const app = express();

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SECRET_KEY, REDIRECT_URI } = process.env;

const redirectURI = encodeURIComponent(`${REDIRECT_URI}/authorized`);

app.get('/authorize', (request, response) => {
  if (request.query.secretKey !== SECRET_KEY) {
    console.log('Error: Incorrect secret key');
    return response.redirect('https://google.com');
  }

  const scopes = encodeURIComponent(
    'playlist-modify-public playlist-modify-private playlist-read-private'
  );

  response.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      SPOTIFY_CLIENT_ID +
      '&scope=' +
      scopes +
      '&redirect_uri=' +
      redirectURI
  );
});

app.get('/authorized', async (request, response) => {
  const error = request.query.error;
  if (error) {
    console.log(`Authorization failed: ${error}`);
  }

  const authorizationCode = request.query.code;
  response.sendStatus(200);

  let accessTokensResponse;

  try {
    accessTokensResponse = await superagent
      .post('https://accounts.spotify.com/api/token')
      .set('Authorization', `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`)
      .send('grant_type=authorization_code')
      .send(`code=${authorizationCode}`)
      .send(`redirect_uri=${redirectURI}`);
  } catch (error) {
    console.log(`Error gettings access tokens: ${error}`);
  }

  console.log(accessTokensResponse);
});

const port = 8080;
console.log(`Listening on port ${port}`);
app.listen(port);
