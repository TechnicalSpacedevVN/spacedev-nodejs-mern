import _ from "lodash";
import { readJsonFile, writeJsonFile } from "../utils/file";

const categories = readJsonFile("categories") || [];

const find = (query) => {
  return _.filter(categories, query);
};
const findById = (id) => {
  return categories.find((e) => e.id === parseInt(id));
};
const create = (data) => {
  data.id = new Date().getTime();
  categories.push(data);
  writeJsonFile("categories", categories);
  return data;
};
const updateById = (id, dataUpdate) => {
  let c = categories.find((e) => e.id === parseInt(id));
  if (c) {
    Object.assign(c, dataUpdate);
    writeJsonFile("categories", categories);
    return true;
  }

  return false;
};
const deleteById = (id) => {
  let i = categories.findIndex((e) => e.id === parseInt(id));
  if (i !== -1) {
    categories.splice(i, 1);
    writeJsonFile("categories", categories);
    return true;
  }

  return false;
};

export const Category = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
