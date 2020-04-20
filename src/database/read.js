import fs from 'fs';
import { DATA_FILE_PATH } from './config.js';
import _ from 'lodash';

export const read = keys => {
  const data = fs.readFileSync(DATA_FILE_PATH);
  const parsedData = JSON.parse(data);

  return _.reduce(
    parsedData,
    (acc, value, key) => {
      if (keys.includes(key)) {
        return {
          ...acc,
          [key]: value
        };
      }

      return acc;
    },
    {}
  );
};
