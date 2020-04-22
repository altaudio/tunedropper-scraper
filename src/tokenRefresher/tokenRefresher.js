import { callEvery } from '../common/callEvery.js';
import { refreshTokens } from '../spotify/api/tokens/refreshTokens.js';
import { setTokens } from '../spotify/tokens.js';

const THIRTY_MINUTES_IN_MS = 1800000;

callEvery(
  async () => {
    const tokens = await refreshTokens();

    if (!tokens) {
      return;
    }

    setTokens(tokens);
  },
  THIRTY_MINUTES_IN_MS,
  { initialCall: false }
);
