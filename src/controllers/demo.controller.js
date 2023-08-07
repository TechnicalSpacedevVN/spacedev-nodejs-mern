import Joi from "joi";
import { Controller, Get, Validate } from "../core/decorator/controller";
import { BaseController } from "./base.controller";

@Controller("/demo")
export class DemoController extends BaseController {
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
