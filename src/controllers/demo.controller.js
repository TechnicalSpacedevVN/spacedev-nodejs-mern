import Joi from "joi";
import { Controller, Get, Validate } from "../core/decorator/controller";

@Controller("/demo")
export class DemoController {
  @Get("/get-demo")
  @Validate(Joi.object({ query: Joi.string().required() }))
  getDemo() {
    console.log("getDemo");
    return "getDemo";
  }

  @Get("/get-demo2")
  getDemo2() {
    return "getDemo2";
  }
}
