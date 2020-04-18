import request from 'superagent';
import { getTokens } from '../../tokens.js';

export const createPlaylist = async ({ name }) => {
  const { USER_ID } = process.env;
  const { accessToken } = getTokens();

  try {
    const { body } = await request
      .post(`https://api.spotify.com/v1/users/${USER_ID}/playlists`)
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json')
      .send(`{"name": "${name}"}`);

    console.log(`Created playist: ${name}`);

    return body;
  } catch (error) {
    console.log(`Error creating playlist: ${error}`);

    return null;
  }
};
