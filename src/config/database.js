import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();
const url = process.env.MONGODB_CONNECT;

const client = new MongoClient(url);

const dbName = process.env.DATABASE_NAME;

const main = async () => {
  await client.connect();

  console.log("Connected successfully to mongodb");
  const db = client.db(dbName);
  const Task = db.collection("tasks");
  const Category = db.collection("categories");
  const User = db.collection("users");

  return { Task, Category, User };
};
let collection = await main();

export default collection;
