import { DemoController } from "./controllers/demo.controller";
import { AppDecorator, BaseApp } from "./core/decorator/app";
const port = 8000;

@AppDecorator({
  controllers: [DemoController]
})
class App extends BaseApp {}

let app = new App();

app.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});
