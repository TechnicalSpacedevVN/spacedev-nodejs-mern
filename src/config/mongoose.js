import _ from "lodash";
import mongoose from "mongoose";
import "../utils/mongoose-plugin";

mongoose.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017", {
    auth: {
      username: "root",
      password: "example",
    },
    dbName: "spacedev-mern",
  });
  console.log("Connected successfully to mongodb (mongoose)");

  // mongoose.sche
};

await main();
