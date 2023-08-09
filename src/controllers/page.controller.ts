import { Controller, Get } from "../core/decorator/router";
import { Response, Request } from "express";

@Controller()
export class PageController {
  @Get("/graphql-page")
  getGraphQLPage(_: Request, res: Response) {
    res.render("graphql-page", { layout: false });
  }
}
