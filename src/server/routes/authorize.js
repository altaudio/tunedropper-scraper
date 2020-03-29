export const authorize = (request, response) => {
  const { SPOTIFY_CLIENT_ID, SECRET_KEY, REDIRECT_URI } = process.env;

  const {
    query: { secretKey: requestSecretKey }
  } = request;

  const redirectURI = encodeURIComponent(REDIRECT_URI);

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
      redirectURI
  );
};
