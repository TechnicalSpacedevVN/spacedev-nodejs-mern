import fs from "fs";

export const readJsonFile = (fileName) => {
  try {
    return JSON.parse(fs.readFileSync(`./data/${fileName}.json`));
  } catch (err) {}
};

export const writeJsonFile = (fileName, data) => {
  fs.writeFileSync(`./data/${fileName}.json`, JSON.stringify(data));
};
