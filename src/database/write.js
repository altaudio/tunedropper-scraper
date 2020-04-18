import fs from 'fs';

export const write = data => {
  const dataFilePath = `${process.cwd()}/src/database/data.json`;
  const dataFile = fs.readFileSync(dataFilePath);
  const parsedData = JSON.parse(dataFile);

  const newData = {
    ...parsedData,
    ...data
  };

  fs.writeFileSync(dataFilePath, JSON.stringify(newData));
};
