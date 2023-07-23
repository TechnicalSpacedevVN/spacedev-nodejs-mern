import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "spacedev-mern";

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
