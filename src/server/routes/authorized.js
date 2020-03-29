import { getTokens } from '../spotify/tokens/getTokens.js';
import { setTokens } from '../tokens.js';

export const authorized = async (request, response) => {
  const error = request.query.error;
  if (error) {
    console.log(`Authorization failed: ${error}`);
    return response.sendStatus(500);
  }

  const authorizationCode = request.query.code;
  response.sendStatus(200);

  try {
    const tokens = await getTokens(authorizationCode);
    setTokens(tokens);
  } catch (error) {
    console.log(`Error gettings access tokens: ${error}`);
  }
};
