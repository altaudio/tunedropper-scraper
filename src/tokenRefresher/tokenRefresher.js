import { callEvery } from '../common/callEvery.js';
import { refreshAccessToken } from '../spotify/api/tokens/refreshAccessToken.js';
import { write } from '../database/write.js';

const REFRESH_INTERVAL = 1800000;

callEvery(
  async () => {
    const accessToken = await refreshAccessToken();

    if (!accessToken) {
      return;
    }

    write({ accessToken });
  },
  REFRESH_INTERVAL,
  { initialCall: false }
);
