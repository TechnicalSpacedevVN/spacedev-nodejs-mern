import { Router } from "express";

export class BaseController {
  router: Router;
  prefix: string
  constructor() {
    this.prefix = ''
    this.router = Router();
  }
}
