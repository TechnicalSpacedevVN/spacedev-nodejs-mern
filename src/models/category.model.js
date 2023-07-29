import _ from "lodash";
import { Category as CategoryRepository } from "../config/database";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";


const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
})


const CategoryModel = mongoose.model('Category', CategorySchema)

const paginate = async (query) => {
  return CategoryModel.paginate(query)
}

const find = async (query) => {
  return await CategoryRepository.find().toArray();
};
const findById = async (id) => {
  if (ObjectId.isValid(id)) {
    return await CategoryRepository.findOne({ _id: new ObjectId(id) });
  }

  return null;
};
const create = async (data) => {
  const result = await CategoryRepository.insertOne(data);
  if (result.insertedId) {
    data._id = result.insertedId;
    return data;
  }
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
  if (ObjectId.isValid(id)) {
    let result = await UserRepository.deleteOne({ _id: new ObjectId(id) });
    return result.modifiedCount >= 1;
  }

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
