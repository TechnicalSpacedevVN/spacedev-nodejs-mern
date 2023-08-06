import Joi from "joi";
import { Controller, Get, Validate } from "../core/decorator/controller";
import { BaseController } from "./base.controller";

@Controller("/demo")
export class DemoController extends BaseController {
  @Get("get-demo")
  // @Validate(Joi.object({}))
  getDemo() {
    return "getDemo";
  }
}
