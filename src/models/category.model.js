import _ from "lodash";
import { Category as CategoryRepository } from "../config/database";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {}
);

console.log("Cateogry model");
const CategoryModel = mongoose.model("Category", CategorySchema);

const paginate = async (query) => {
  return CategoryModel.paginate(query);
};

const find = async (query) => {
  return await CategoryRepository.find().toArray();
};
const findById = async (id) => {
  if (ObjectId.isValid(id)) {
    return await CategoryModel.findOne({ _id: new ObjectId(id) });
  }

  return null;
};
const create = async (data) => {
  const result = new CategoryModel(data);
  await result.save();
  return result;
  return false;
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await CategoryRepository.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: dataUpdate,
      }
    );
    return result.modifiedCount >= 1;
  }

  return false;
};
const deleteById = async (id) => {
  let result = await CategoryModel.updateOne({
    _id: id,
    deletedAt: new Date(),
  });
  return result.modifiedCount >= 1;

  return false;
};

export const Category = {
  find,
  paginate,
  findById,
  create,
  updateById,
  deleteById,
};
