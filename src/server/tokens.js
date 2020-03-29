let tokens = {
  accessToken: null,
  refreshToken: null
};

export const setTokens = newTokens => {
  tokens = {
    ...tokens,
    ...newTokens
  };
};

export const getTokens = () => tokens;
