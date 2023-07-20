import express from "express";
import { config } from "dotenv";
import { taskRouter } from "./src/routes/task.router";
import cors from "cors";
import { categoryRouter } from "./src/routes/category.router";
import { userRouter } from "./src/routes/user.router";
import { logMiddleware } from "./src/middlewares/log.middleware";
import { errorMiddleware } from "./src/middlewares/error.middleware";
import { fileRouter } from "./src/routes/file.router";
import morgan from "morgan";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const accessLogStream = fs.createWriteStream(
  path.join(fileURLToPath(import.meta.url), "../logs/access.log"),
  { flags: "a" }
);
const app = express();

config();

const port = process.env.PORT;
morgan.token("id", (req) => req.id);

app.disable('x-powered-by')
app.use(express.json());
app.use(cors());
app.use(logMiddleware);
app.use((req, res, next) => {
  req.id = randomUUID()
  next()
})

app.use(
  morgan(
    ":id :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms",
    { stream: accessLogStream }
  )
);
app.use("/upload", express.static("./upload"));

app.use("/task", taskRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);


app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Server runing at http://localhost:8000");
});
