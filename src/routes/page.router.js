import { Router } from "express";
import { PageController } from "../controllers/page.controller";

export const pageRouter = Router();

pageRouter
  .get("/", PageController.home)
  .get("/courses", PageController.courses)
  .get("/courses/:id", PageController.courseDetail);
