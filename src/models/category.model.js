import _ from "lodash";
import { ObjectId } from "mongodb";
import collection from "../config/database";

export const CategoryRepository = collection.Category;

const find = async (query = {}) => {
  // let { name } = query;

  // let _query = _.omit(query, "name");
  // if (name) {
  //   _query.name = { $regex: new RegExp(name, "i") };
  // }
  return CategoryRepository.paginate(query);
};
const findById = async (id) => {
  if (ObjectId.isValid(id)) {
    return await CategoryRepository.findOne({ _id: new ObjectId(id) });
  }
  return null;
};
const findByIds = async (id) => {
  let checkObjectId = ids.some((e) => !ObjectId.isValid(e));
  if (checkObjectId) return [];

  let arrayIds = ids.map((e) => new ObjectId(e));

  return CategoryRepository.find({ _id: { $in: arrayIds } }).toArray();
};
const create = async (data) => {
  let result = await CategoryRepository.insertOne(data);
  data._id = result.insertedId;
  return data;
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await CategoryRepository.updateOne(
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
    let result = await CategoryRepository.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
  return false;
};

export const Category = {
  find,
  findById,
  findByIds,
  create,
  updateById,
  deleteById,
};