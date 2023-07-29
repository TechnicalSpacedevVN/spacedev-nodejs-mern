import _ from "lodash";
import { User as UserRepository } from "../config/database";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

export const UserModel = mongoose.model('User', UserSchema)


const paginate = (query) => {
  return UserModel.paginate(query)
}

const find = async (query) => {
  return UserModel.paginate(query)

  // let _query = _.omit(query, "name", "age");
  // if (query.age) {
  //   _query.age = parseInt(query.age);
  // }

  // if (query.name) {
  //   // _query.name = { $regex: new RegExp(query.name, "i") };
  //   _query.$text = { $search: query.name };
  // }
  // return await UserRepository.find(_query).toArray();
};
const findById = async (id) => {
  if (ObjectId.isValid(id)) {
    return await UserRepository.findOne({ _id: new ObjectId(id) });
  }

  return null;
  // return users.find((e) => e.id === parseInt(id));
};

const findByIds = (ids) => {
  return users.filter((e) => ids.includes(e.id));
};
const create = async (data) => {
  let user = new UserModel(data)
  await user.save()
  return user
};
const updateById = async (id, dataUpdate) => {
  if (ObjectId.isValid(id)) {
    let result = await UserRepository.updateOne(
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

export const User = {
  find,
  findById,
  create,
  updateById,
  deleteById,
  findByIds,
  paginate
};
