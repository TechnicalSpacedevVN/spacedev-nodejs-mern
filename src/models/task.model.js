import collection, { DEFAULT_LIMIT } from "../config/database";
import { readJsonFile, writeJsonFile } from "../utils/file";
import { User } from "./user.model";
import _ from "lodash";
import { Category } from "./category.model";
import mongoose, { Schema, SchemaType, ObjectId } from "mongoose";

const TaskSchema = new Schema({
  name: {
    type: Schema.Types.String,
    index: "text",
  },
  description: {
    type: String,
    index: "text",
  },
  users: [Schema.Types.ObjectId],
  category: Schema.Types.ObjectId,
  color: String,
});

console.log(TaskSchema.indexes());

export let Task = mongoose.model("Post", TaskSchema);

// export const TaskRepository = collection.Task;

// const tasks = readJsonFile("tasks") || [];

/**
 * Paginate - Cách 1: Trả về thông tin response với đầy đủ dữ liệu -> ví dụ: tiki
 *
 */

const paginate = async (query) => {
  return TaskRepository.paginate(query, [
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "users",
      },
    },
  ]);
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

// export const Task = {
//   paginate,
//   find,
//   findById,
//   create,
//   updateById,
//   deleteById,
// };
