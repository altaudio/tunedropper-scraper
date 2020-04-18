import { write } from '../database/write.js';
import { read } from '../database/read.js';

export const setTokens = newTokens => {
  write(newTokens);
};

export const getTokens = () => read(['accessToken', 'refreshToken']);
