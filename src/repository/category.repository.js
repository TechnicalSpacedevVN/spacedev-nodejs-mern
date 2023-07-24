import _ from "lodash";
import { Category } from "../model/Category.model";
import { ObjectId } from "mongodb";

const find = async (query) => {
  return Category.find(query).toArray();
};
const findById = async (id) => {
  if (ObjectId.isValid(id)) {
    return await Category.findOne({ _id: new ObjectId(id) });
  }
  return null;
};
const create = async (data) => {
  let result = await Category.insertOne(data);
  data._id = result.insertedId;
  return data;
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await Category.updateOne(
      { _id: new ObjectId(id) },
      { $set: dataUpdate }
    );

    if (result.modifiedCount) {
      return findById(id);
    }
  }

  return false;
};
const deleteById = async (id) => {
  if (ObjectId.isValid(id)) {
    let result = await Category.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
  return false;
};

export const CategoryRepository = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
