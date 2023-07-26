import _ from "lodash";
import collection, { DEFAULT_LIMIT } from "../config/database";
import { ObjectId } from "mongodb";

export const UserRepository = collection.User;

const paginate = async (query, page = 1, perPage = DEFAULT_LIMIT) => {
  let { name } = query;
  let _query = _.omit(query, "name");
  if (name) {
    _query.$text = { $search: name };
  }
  let skip = (page - 1) * perPage;

  let total = await UserRepository.countDocuments(_query);

  let data = await UserRepository.find(_query)
    .limit(perPage)
    .skip(skip)
    .toArray();

  return {
    total,
    data,
  };
};

const find = (query) => {
  let { name } = query;
  let _query = _.omit(query, "name");
  if (name) {
    _query.$text = { $search: name };
  }
  return UserRepository.find(_query).toArray();
};
const findById = (id) => {
  if (ObjectId.isValid(id)) {
    return UserRepository.findOne(new ObjectId(id));
  }
  return null;
};

const findByIds = (ids) => {
  let checkObjectId = ids.some((e) => !ObjectId.isValid(e));
  if (checkObjectId) return [];

  let arrayIds = ids.map((e) => new ObjectId(e));

  return UserRepository.find({ _id: { $in: arrayIds } }).toArray();
};
const create = async (data) => {
  let result = await UserRepository.insertOne(data);
  data._id = result.insertedId;
  return data;
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await UserRepository.updateOne(
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
    let result = await UserRepository.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
  return false;
};

export const User = {
  paginate,
  find,
  findById,
  create,
  updateById,
  deleteById,
  findByIds,
};
