import { write } from '../database/write.js';

export const setTokens = newTokens => {
  write(newTokens);
};

export const getTokens = () => null;
