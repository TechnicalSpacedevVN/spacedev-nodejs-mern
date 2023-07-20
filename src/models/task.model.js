import { readJsonFile, writeJsonFile } from "../utils/file";
import { Category } from "./category.model";
import { User } from "./user.model";
import _ from "lodash";

const tasks = readJsonFile("tasks") || [];

const find = (query) => {
  return _.filter(tasks, query).map((e) => {
    return {
      ...e,
      category: e.category ? Category.findById(e.category) : null,
      users: Array.isArray(e.users) ? User.findByIds(e.users) : null,
    };
  });
};
const findById = (id) => {
  let t = tasks.find((e) => e.id === parseInt(id));
  if (t) {
    return {
      ...t,
      category: t.category ? Category.findById(t.category) : undefined,
      users: Array.isArray(t.users) ? User.findByIds(t.users) : null,
    };
  }

  return false;
};
const create = (data) => {
  data.id = new Date().getTime();
  if(data.category) {
    let check = Category.findById(data.category)
    if(!check) {
      throw "Category not found"
    }
  }
  if(Array.isArray(data.users)) {
    let check = User.findByIds(data.users).length === data.users.length
    if(!check) {
      throw "User not found"
    }
  }
  tasks.push(data);
  writeJsonFile("tasks", tasks);
  return data;
};
const updateById = (id, dataUpdate) => {
  let c = tasks.find((e) => e.id === parseInt(id));
  if (c) {
    Object.assign(c, dataUpdate);
    writeJsonFile("tasks", tasks);
    return true;
  }

  return false;
};
const deleteById = (id) => {
  let i = tasks.findIndex((e) => e.id === parseInt(id));
  if (i !== -1) {
    tasks.splice(i, 1);
    writeJsonFile("tasks", tasks);
    return true;
  }

  return false;
};

export const Task = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
