import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const createPlaylist = async ({ name }) => {
  const { USER_ID } = process.env;
  const { accessToken } = getTokens();

  try {
    await request
      .post(`https://api.spotify.com/v1/users/${USER_ID}/playlists`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send(`{"name": "${name}"}`);
  } catch (error) {
    console.log(error);
  }
};
