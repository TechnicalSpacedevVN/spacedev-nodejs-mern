import _ from "lodash";
import { readJsonFile, writeJsonFile } from "../utils/file";
import collection from "../config/database";
import { ObjectId } from "mongodb";

const categories = readJsonFile("categories") || [];

const find = async (query) => {
  return collection.Category.find(query).toArray();

  // return _.filter(categories, query);
};
const findById = (id) => {
  if (ObjectId.isValid(id)) {
    return collection.Category.findOne({ _id: new ObjectId(id) });
  }
  return null;
};
const create = async (data) => {
  return await collection.Category.insertOne(data);
  // data.id = new Date().getTime();
  // categories.push(data);
  // writeJsonFile("categories", categories);
  // return data;
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await collection.Category.updateOne(
      { _id: new ObjectId(id) },
      { $set: dataUpdate }
    );

    if (result.modifiedCount) {
      return findById(id);
    }
  }

  return false;

  // let c = await findById(id);
  // if (c) {

  //   Object.assign(c, dataUpdate);
  //   writeJsonFile("categories", categories);
  //   return true;
  // }

  return false;
};
const deleteById = (id) => {
  let i = categories.findIndex((e) => e.id === parseInt(id));
  if (i !== -1) {
    categories.splice(i, 1);
    writeJsonFile("categories", categories);
    return true;
  }

  return false;
};

export const Category = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
