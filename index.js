import express from "express";
import { config } from "dotenv";
import { taskRouter } from "./src/routes/task.router";
import cors from "cors";
import { categoryRouter } from "./src/routes/category.router";
import { userRouter } from "./src/routes/user.router";
import { logMiddleware } from "./src/middlewares/log.middleware";
import { errorMiddleware } from "./src/middlewares/error.middleware";
import { fileRouter } from "./src/routes/file.router";
// const express = require("express");
const app = express();
// const {config} = require('dotenv')

config();

const port = process.env.PORT;

app.use(express.json());
app.use(cors())
app.use(logMiddleware)
app.use('/upload', express.static('./upload'))

app.use("/task", taskRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);


app.use(errorMiddleware)

app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log("Server runing at http://localhost:8000");
});
