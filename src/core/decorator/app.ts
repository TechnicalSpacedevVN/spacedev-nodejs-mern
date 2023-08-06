import express, { Express } from "express";
import { config } from "dotenv";
import { taskRouter } from "../../routes/task.router";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
// import { categoryRouter } from "./routes/category.router";
import { userRouter } from "../../routes/user.router";
// import { logMiddleware } from "./middlewares/log.middleware";
// import { errorMiddleware } from "./middlewares/error.middleware";
// import { fileRouter } from "./routes/file.router";
import { randomUUID } from "crypto";
import morgan from "morgan";
import fs from "fs";
// import { fileURLToPath } from "url";
import path, { dirname } from "path";
import helmet from "helmet";
import { pageRouter } from "../../routes/page.router";
import { create } from "express-handlebars";

interface AppDecoratorOptions {
  controllers?: any[];
}

export const AppDecorator = (options?: AppDecoratorOptions): any => {
  return (constructor: any) => {
    return class extends constructor {
      app: Express;
      constructor(...args: any[]) {
        super(...args);
        this.app = express();
        const main = async () => {
          const accessLogStream = fs.createWriteStream(
            path.join("./logs/access.log"),
            {
              flags: "a",
            }
          );
          // const {config} = require('dotenv')

          morgan.token("id", (req: any) => {
            return req.id;
          });

          config();

          function assignId(req: any, res: any, next: any) {
            req.id = randomUUID();
            next();
          }

          const hdb = create({
            extname: ".html",
          });
          this.app.engine("html", hdb.engine);
          this.app.set("view engine", "html");
          this.app.set("views", path.resolve("./src/views"));

          this.app.use(express.json());
          this.app.use(cors());

          // this.app.use(helmet());
          this.app.use(assignId);
          // this.app.use(logMiddleware)
          this.app.use(morgan("combined", { stream: accessLogStream }));
          this.app.use("/upload", express.static("./upload"));
          this.app.use(express.static("./public"));
          let { controllers } = options || {};

          if(controllers) {
            controllers.map(e => new e(this.app))
          }

          // this.app.use(xTokenMiddleware)
          // this.app.all('/graphql', createHandler({ schema }));
          //   await server.start();
          //   this.app.use(
          //     "/graphql",
          //     expressMiddleware(server, {
          //       context: async ({ req }) => ({ token: req.headers.token }),
          //     })
          //   );
          //   this.app.use("/task", taskRouter);
          // this.app.use("/category", categoryRouter);
          // this.app.use("/user", userRouter);
          // this.app.use("/file", fileRouter);
          // this.app.use("/auth", authRouter);

          //   this.app.use(demoController.router);

          //   this.app.use(pageRouter);

          // this.app.use(errorMiddleware);

          this.app.all("*", (req, res) => {
            res.status(404).json({ error: "Not Found" });
          });
        };

        main();
      }

      listen(port?: number | string, cb?: () => void) {
        this.app.listen(port, cb);
      }
    };
  };
};

export class BaseApp {
  listen(port?: number | string, cb?: () => void) {}
}
