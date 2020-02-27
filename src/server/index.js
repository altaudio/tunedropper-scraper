import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/authorize', (request, response) => {
  if (request.query.secretKey !== process.env.SECRET_KEY) {
    console.log('Error: Incorrect secret key');
    return response.redirect('https://google.com');
  }

  const redirectURI = encodeURIComponent('https://google.com');
  const scopes = encodeURIComponent(
    'playlist-modify-public playlist-modify-private playlist-read-private'
  );

  response.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      process.env.SPOTIFY_CLIENT_ID +
      '&scope=' +
      scopes +
      '&redirect_uri=' +
      redirectURI
  );
});

const port = 9090;
console.log(`Listening on port ${port}`);
app.listen(port);
