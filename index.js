import express from "express";
import { config } from "dotenv";
import { taskRouter } from "./src/routes/task.router";
import cors from "cors";
import { categoryRouter } from "./src/routes/category.router";
import { userRouter } from "./src/routes/user.router";
import { logMiddleware } from "./src/middlewares/log.middleware";
import { errorMiddleware } from "./src/middlewares/error.middleware";
import { fileRouter } from "./src/routes/file.router";
import { randomUUID } from "crypto";
import morgan from "morgan";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import helmet from "helmet";
import { pageRouter } from "./src/routes/page.router";
import handlebars from 'express-handlebars'
import { xTokenMiddleware } from "./src/middlewares/x-token.middleware";
import './src/config/database'



let __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/access.log"),
  { flags: "a" }
);
// const {config} = require('dotenv')

morgan.token("id", (req) => {
  return req.id;
});

config();

const port = process.env.PORT;
function assignId(req, res, next) {
  req.id = randomUUID();
  next();
}

const hdb = handlebars.create({
  extname: '.html',
})
app.engine('html', hdb.engine)
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, './src/views'))


app.use(express.json());
app.use(cors());

app.use(helmet())
app.use(assignId);

// app.use(logMiddleware)
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("combined"));
app.use("/upload", express.static("./upload"));
app.use(express.static('./public'))

// app.use(xTokenMiddleware)

app.use("/task", taskRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);

app.use(pageRouter)

app.use(errorMiddleware);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log("Server runing at http://localhost:8000");
});
