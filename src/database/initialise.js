import fs from 'fs';
import { DATA_FILE_PATH } from './config.js';

export const createDataFile = () => {
  if (fs.existsSync(DATA_FILE_PATH)) {
    return;
  }

  return fs.writeFileSync(DATA_FILE_PATH, JSON.stringify({}));
};
