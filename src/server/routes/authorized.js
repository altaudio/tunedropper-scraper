import { getTokens } from '../spotify/api/getTokens.js';
import { setTokens } from '../spotify/tokens.js';

export const authorized = async (request, response) => {
  const error = request.query.error;
  if (error) {
    console.log(`Authorization failed: ${error}`);
    return response.sendStatus(500);
  }

  const authorizationCode = request.query.code;

  try {
    const tokens = await getTokens(authorizationCode);
    setTokens(tokens);
    response.status(200).send({ message: 'Tunedropper authorized' });
  } catch (error) {
    const errorMessage = `Error gettings access tokens: ${error}`;
    console.log(errorMessage);
    response.status(500).send({ message: errorMessage });
  }
};
