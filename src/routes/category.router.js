import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export const categoryRouter = Router();

categoryRouter
  .get("", CategoryController.get)
  .get("/:id", CategoryController.getDetail)
  .post("", CategoryController.create)
  .put("/:id", CategoryController.updateById)
  .delete("/:id", CategoryController.deleteById);
