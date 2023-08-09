import _ from "lodash";
import mongoose from "mongoose";
import "../utils/mongoose-plugin";

export interface IDatabaseConfig {
  auth: {
    password: string;
    username: string;
  };
  dbName: string;
}

export const main = async (options: IDatabaseConfig) => {
  mongoose.set("toJSON", {
    transform: (doc, record) => {
      record.id = record._id;
      delete record._id;
    },
  });

  await mongoose.connect("mongodb://localhost:27017", options);
  console.log("Connected successfully to mongodb (mongoose)");
  // mongoose.sche
};

