import mongoose from "mongoose";

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017", {
    auth: {
        username: 'root',
        password: 'example'
    },
    dbName: 'spacedev-mern'
  });
  console.log("Connected successfully to mongodb (mongoose)");
};


await main()