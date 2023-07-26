import { ObjectId } from "mongodb";
import collection, { DEFAULT_LIMIT } from "../config/database";
import { readJsonFile, writeJsonFile } from "../utils/file";
import { User } from "./user.model";
import _ from "lodash";
import { Category } from "./category.model";

export const TaskRepository = collection.Task;

const tasks = readJsonFile("tasks") || [];

/**
 * Paginate - Cách 1: Trả về thông tin response với đầy đủ dữ liệu -> ví dụ: tiki
 *
 */

const paginate = async (...args) => {
  // let { title } = query;

  // let _query = _.omit(query, "title");
  // if (title) {
  //   _query.title = { $regex: new RegExp(title, "i") };
  // }
  // let count = await TaskRepository.countDocuments(_query);

  // let skip = (page - 1) * DEFAULT_LIMIT;
  // let data = await TaskRepository.find(_query)
  //   .limit(perPage)
  //   .skip(skip)
  //   .toArray();

  // await Promise.all(
  //   data.map(async (task) => {
  //     let pros = [];
  //     if (task.category) pros.push(Category.findById(task.category));
  //     if (task.users) pros.push(User.findByIds(task.users));

  //     let [category = null, users = []] = await Promise.all(pros);
  //     task.category = category;
  //     task.users = users;
  //   })
  // );

  // const pipeline = [
  //   {
  //     $match: _query,
  //   },
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "category",
  //       foreignField: "_id",
  //       as: "category",
  //     },
  //   },
  //   {
  //     $unwind: "$category", // convert từ array thành single
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "users",
  //       foreignField: "_id",
  //       as: "users",
  //     },
  //   },
  // ];
  // if (fields.length > 0) {
  //   pipeline.push({
  //     $project: fields.reduce(
  //       (result, currentValue) => ({ ...result, [currentValue]: 1 }),
  //       {}
  //     ),
  //   });
  // }

  // let data = await TaskRepository.aggregate(pipeline)
  //   .skip(skip)
  //   .limit(perPage)
  //   .toArray();

  // let result = {
  //   total: count,
  //   totalPage: Math.ceil(count / perPage),
  //   currentPage: page,
  //   data,
  // };

  // if (page < result.totalPage) result.nextPage = page + 1;
  // if (page > 1) result.prevPage = page - 1;

  // return result;
  return TaskRepository.paginate(...args)
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
  if (data.category && ObjectId.isValid(data.category))
    data.category = new ObjectId(data.category);

  if (
    Array.isArray(data.users) &&
    !data.users.some((e) => !ObjectId.isValid(e))
  ) {
    data.users = data.users.map((e) => new ObjectId(e));
  }

  let task = await TaskRepository.insertOne(data);
  data._id = task.insertedId;
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
  paginate,
  find,
  findById,
  create,
  updateById,
  deleteById,
};
