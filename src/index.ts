import { config } from "dotenv";
import { AppDecorator, BaseApp } from "./core/decorator/AppDecorator";
import "./core/decorator/demo";
import { DemoController } from "./controllers/demo.controller";
import { server } from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { PageController } from "./controllers/page.controller";

config();
let port = process.env.PORT;

@AppDecorator({
  controllers: [DemoController, PageController],
  database: {
    auth: {
      username: "root",
      password: "example",
    },
    dbName: "spacedev-mern",
  },
})
class App extends BaseApp {}

let app = new App();

const main = async () => {
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`Server runing at http://localhost:${port}`);
  });
};

main();
