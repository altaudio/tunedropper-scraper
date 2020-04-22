import fs from 'fs';
import { DATA_FILE_PATH } from './config.js';

const writeData = data => {
  const dataFile = fs.readFileSync(DATA_FILE_PATH);
  const parsedData = JSON.parse(dataFile);

  const newData = {
    ...parsedData,
    ...data
  };

  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newData));
};

export const write = data => {
  writeData(data);
};
