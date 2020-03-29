export const authorize = (request, response) => {
  const { SPOTIFY_CLIENT_ID, SECRET_KEY, REDIRECT_URI } = process.env;

  const requestSecretKey = request.query.secretKey;

  if (requestSecretKey !== SECRET_KEY) {
    console.log('Error: Incorrect secret key');
    return response.sendStatus(404);
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
      encodeURIComponent(REDIRECT_URI)
  );
};
