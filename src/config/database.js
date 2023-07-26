import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { initPlugin } from "../utils/mongodb-plugin";
config();

const url = process.env.MONGODB_CONNECT;

const client = new MongoClient(url);

const dbName = process.env.DATABASE_NAME;

const main = async () => {
  await client.connect();

  console.log("Connected successfully to mongodb");
  const db = client.db(dbName);
  const Task = db.collection("tasks", {});
  const Category = db.collection("categories");
  const User = db.collection("users");

  User.createIndex({ name: "text" });
  Task.createIndex({ title: "text" });
  Category.createIndex({ name: "text" });

  initPlugin({ User, Task, Category });

  return { Task, Category, User };
};
let collection = await main();

export default collection;

export const DEFAULT_LIMIT = 10;
