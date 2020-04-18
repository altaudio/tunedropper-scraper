import fs from 'fs';

const dataFilePath = `${process.cwd()}/src/database/data.json`;

const writeData = data => {
  const dataFile = fs.readFileSync(dataFilePath);
  const parsedData = JSON.parse(dataFile);

  const newData = {
    ...parsedData,
    ...data
  };

  fs.writeFileSync(dataFilePath, JSON.stringify(newData));
};

const createDataFile = () => {
  if (fs.existsSync(dataFilePath)) {
    return;
  }

  return fs.writeFileSync(dataFilePath, JSON.stringify({}));
};

export const write = data => {
  createDataFile();
  writeData(data);
};
