import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { updateTaskSchema } from "../schema/task";

export const taskRouter = Router();

// Lấy danh sách tásk - R
taskRouter
  .get("/count", TaskController.count)
  .get("", TaskController.get)
  .get("/:id", TaskController.getDetail)
  .post("", TaskController.create)
  .put("/:id", TaskController.updateById)
  .patch("/:id", validate(updateTaskSchema), TaskController.updatePartial)
  .delete("/:id", TaskController.deleteById)
  .get('/get-category/:id', TaskController.getCategory);

