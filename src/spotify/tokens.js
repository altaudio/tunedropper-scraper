import fs from 'fs'

export const setTokens = newTokens => {
  const dataFilePath = `${process.cwd()}/data.json`
  const dataFile = fs.readFileSync(dataFilePath)
  const parsedData = JSON.parse(dataFile)

  const dataWithTokens = {
    ...parsedData,
    ...newTokens
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(dataWithTokens))
};

export const getTokens = () => null;
