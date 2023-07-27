import mongoose, { Schema } from "mongoose";
import { Category } from "./category.model";
import { User } from "./user.model";
import _ from "lodash";
import { DEFAULT_LIMIT, Task as TaskRepository } from "../config/database";
import { ObjectId } from "mongodb";

// const DEFAULT_LIMIT = 10;

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: {
      type: String,
      required: true,
    },
    color: {
      type: Schema.Types.String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", TaskSchema);

const count = async (query) => {
  let _query = _.omit(query, "title", "isDone", "minStartDate", "maxStartDate");

  if (query.title) {
    _query.$text = { $search: query.title };
  }

  if (query.isDone) {
    _query.isDone = query.isDone === "true";
  }

  let count = await TaskRepository.countDocuments(_query);

  return count;
};

const paginate = async (query) => {
  return TaskModel.find(query).populate("category users");

  // return TaskRepository.paginate(query, [
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "category",
  //       foreignField: "_id",
  //       as: "category",
  //     },
  //   },
  //   {
  //     $unwind: "$category",
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "users",
  //       foreignField: "_id",
  //       as: "users",
  //     },
  //   },
  // ]);
};

const find = async (query) => {
  let _query = _.omit(query, "title", "isDone");

  if (query.title) {
    _query.$text = { $search: query.title };
  }

  if (query.isDone) {
    _query.isDone = query.isDone === "true";
  }
  let result = await TaskRepository.find(_query).toArray();
  return result;
};
const findById = async (id) => {
  let task = await TaskModel.findOne({ _id: id });
  if(task) {
    task.description = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    task.save()
  }
  // if (ObjectId.isValid(id)) {
  //   // return await TaskRepository.findOne({ _id: new ObjectId(id) });
  // }

  return task;
};
const create = async (data) => {
  try {
    let task = new TaskModel(data);
    // await TaskModel.updateOne({_id: 'abc'}, {title: 'asdfasdf'})
    await task.save();
    return task;
  } catch (err) {
    throw err;
  }

  // if (data.category) data.category = new ObjectId(data.category);

  // if (Array.isArray(data.users))
  //   data.users = data.users.map((e) => new ObjectId(e));
  // let result = await TaskRepository.insertOne(data);

  // data._id = result.insertedId;

  // return data;
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await TaskRepository.updateOne(
      { _id: new ObjectId(id) },
      { $set: dataUpdate }
    );
    return result.modifiedCount >= 1;
  }

  return false;
};
const deleteById = async (id) => {
  if (ObjectId.isValid(id)) {
    let result = await TaskRepository.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount >= 1;
  }
  return false;
};

export const Task = {
  count,
  paginate,
  find,
  findById,
  create,
  updateById,
  deleteById,
};
