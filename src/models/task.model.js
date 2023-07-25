import collection, { DEFAULT_LIMIT } from "../config/database";
import { readJsonFile, writeJsonFile } from "../utils/file";
import { User } from "./user.model";
import _ from "lodash";

export const TaskRepository = collection.Task;

const tasks = readJsonFile("tasks") || [];

/**
 * Paginate - Cách 1: Trả về thông tin response với đầy đủ dữ liệu -> ví dụ: tiki
 *
 */

const paginate = async (query = {}, page = 1, perPage = DEFAULT_LIMIT) => {
  let { title } = query;

  let _query = _.omit(query, "title");
  if (title) {
    _query.title = { $regex: new RegExp(title, "i") };
  }
  let count = await TaskRepository.countDocuments(_query);

  let skip = (page - 1) * DEFAULT_LIMIT;

  let data = await TaskRepository.find(_query)
    .limit(perPage)
    .skip(skip)
    .toArray();

  let result = {
    total: count,
    totalPage: Math.ceil(count / perPage),
    currentPage: page,
    data,
  };

  if (page < result.totalPage) result.nextPage = page + 1;
  if (page > 1) result.prevPage = page - 1;

  return result;
};

const find = (query = {}) => {
  let { title } = query;

  let _query = _.omit(query, "title");
  if (title) {
    _query.title = { $regex: new RegExp(title, "i") };
  }
  return TaskRepository.find(_query).toArray();
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
  let task = await TaskRepository.insertOne(data);
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
  paginate,
  find,
  findById,
  create,
  updateById,
  deleteById,
};
