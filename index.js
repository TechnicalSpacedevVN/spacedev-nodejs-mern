import express from "express";
import { config } from "dotenv";
import { taskRouter } from "./src/routes/task.route";
import cors from "cors";
// const express = require("express");
const app = express();
// const {config} = require('dotenv')

config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors())

app.get("/hello", (req, res, next) => {
  console.log("Hello 1");
  res.json({ hello: true });
  // next();
});

app.get("/hello", (req, res, next) => {
  console.log("Hello 2");
  // next();

  // res.json({ hello2: true });
});

app.get("/hello", (req, res) => {
  console.log("Hello 3");
  res.json({ hello3: true });
});

app.use("/task", taskRouter);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log("Server runing at http://localhost:8000");
});
