import _ from "lodash";
import { readJsonFile, writeJsonFile } from "../utils/file";

const users = readJsonFile("users") || [];

const find = (query) => {
  return _.filter(users, query);
};
const findById = (id) => {
  return users.find((e) => e.id === parseInt(id));
};

const findByIds = (ids) => {
  return users.filter((e) => ids.includes(e.id));
};
const create = (data) => {
  data.id = new Date().getTime();
  users.push(data);
  writeJsonFile("users", users);
  return data;
};
const updateById = (id, dataUpdate) => {
  let c = users.find((e) => e.id === parseInt(id));
  if (c) {
    Object.assign(c, dataUpdate);
    writeJsonFile("users", users);
    return true;
  }

  return false;
};
const deleteById = (id) => {
  let i = users.findIndex((e) => e.id === parseInt(id));
  if (i !== -1) {
    users.splice(i, 1);
    writeJsonFile("users", users);
    return true;
  }

  return false;
};

export const User = {
  find,
  findById,
  create,
  updateById,
  deleteById,
  findByIds,
};
