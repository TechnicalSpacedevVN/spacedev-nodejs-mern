import { MongoClient } from "mongodb";

const stringConnect = "mongodb://root:example@localhost:27017";

const dbName = "spacedev-mern";

const client = new MongoClient(stringConnect);

const main = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to mongodb");
  const db = client.db(dbName);
  const Task = db.collection("tasks");
  const Category = db.collection("categories");
  const User = db.collection("users");

  Task.createIndex({ title: "text" });
  User.createIndex({ name: "text" });

  return {
    Task,
    Category,
    User,
  };
};

let collection = await main();

export const { Category, Task, User } = collection;

export const DEFAULT_LIMIT = 3