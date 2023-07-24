import collection from "../config/database";
import { readJsonFile, writeJsonFile } from "../utils/file";
import { CategoryRepository } from "./category.repository";
import { User } from "./user.repository";
import _ from "lodash";

const tasks = readJsonFile("tasks") || [];

const find = (query) => {
  return collection.Task.find(query).toArray();
  // return _.filter(tasks, query).map(async (e) => {
  //   return {
  //     ...e,
  //     category: e.category ? await Category.findById(e.category) : null,
  //     users: Array.isArray(e.users) ? User.findByIds(e.users) : null,
  //   };
  // });
};
const findById = (id) => {
  let t = tasks.find((e) => e.id === parseInt(id));
  if (t) {
    return {
      ...t,
      category: t.category
        ? CategoryRepository.findById(t.category)
        : undefined,
      users: Array.isArray(t.users) ? User.findByIds(t.users) : null,
    };
  }

  return false;
};
const create = async (data) => {
  let task = await collection.Task.insertOne(data);

  // data.id = new Date().getTime();
  // if(data.category) {
  //   let check = Category.findById(data.category)
  //   if(!check) {
  //     throw "Category not found"
  //   }
  // }
  // if(Array.isArray(data.users)) {
  //   let check = User.findByIds(data.users).length === data.users.length
  //   if(!check) {
  //     throw "User not found"
  //   }
  // }
  // tasks.push(data);
  // writeJsonFile("tasks", tasks);
  return task;
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
