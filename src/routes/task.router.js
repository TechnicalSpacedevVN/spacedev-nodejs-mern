import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { validate } from "../middlewares/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schema/task";

export const taskRouter = Router();
// Lấy danh sách tásk - R
taskRouter.get("", TaskController.get);

taskRouter.get("/:id", TaskController.getDetail);
// tạo task - C
taskRouter.post("", validate(createTaskSchema), TaskController.create);
// Cập nhật task - U
taskRouter.put("/:id", TaskController.updateById);

// Cập nhật task - U
taskRouter.patch(
  "/:id",
  validate(updateTaskSchema),
  TaskController.updatePartialById
);
// Xóa task - D
taskRouter.delete("/:id", TaskController.deleteById);
