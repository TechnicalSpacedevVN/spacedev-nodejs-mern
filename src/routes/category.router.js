import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter
  .get("", CategoryController.get)
  .get("/:id", CategoryController.getDetail)
  .post("", CategoryController.create)
  .put("/:id", CategoryController.updatedById)
  .delete("/:id", CategoryController.deleteById);
