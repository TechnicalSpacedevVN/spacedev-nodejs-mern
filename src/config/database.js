import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

// Tạo một plugin để ghi log thời gian thực thi các câu truy vấn
function logQueryExecutionTime(client) {
  const originalQuery = client.prototype.query;

  client.prototype.query = function (...args) {
    const start = Date.now();
    const result = originalQuery.apply(this, args);
    const end = Date.now();
    console.log(`Thời gian thực thi: ${end - start}ms`);
    return result;
  };
}

const url = process.env.MONGODB_CONNECT;

const client = new MongoClient(url);

logQueryExecutionTime(MongoClient);

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

  return { Task, Category, User };
};
let collection = await main();

export default collection;

export const DEFAULT_LIMIT = 10;
