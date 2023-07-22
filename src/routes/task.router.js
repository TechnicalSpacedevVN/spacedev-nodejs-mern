import { Router } from "express";
import { Task } from "../models/task.model";
import { validate } from "../middlewares/validate.middleware";
import Joi from "joi";
import { Category } from "../models/category.model";
import { User } from "../models/user.model";
import { BadRequest, Created, NoContent } from "../config/StatusCode";
import { HttpResponse } from "../utils/HttpResponse";

export const taskRouter = Router();

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().optional().allow(null),
  category: Joi.custom((value, helper) => {
    if (!Category.findById(value)) {
      return helper.message("Không tìm thấy category");
    }
  }),
  users: Joi.array()
    .items(Joi.number())
    .custom((value, helper) => {
      if (User.findByIds(value).length < value.length) {
        return helper.message("Không tìm thấy user");
      }
    }),
  color: Joi.string().optional().default("#ffffff"),
});

const createTaskSchema = updateTaskSchema.fork(
  ["title", "category"],
  (schema) => schema.required()
);

// Lấy danh sách tásk - R
taskRouter.get("", async (req, res) => {
  // await delay(2000);
  res.json(HttpResponse.Paginate(Task.find(req.query)));
});

taskRouter.get("/:id", async (req, res) => {
  // await delay(2000);
  let t = Task.findById(req.params.id);
  if (t) {
    return res.json(Task.findById(req.params.id));
  }

  res.status(BadRequest).json({ error: "Task Not found" });
});
// tạo task - C
taskRouter.post("", validate(createTaskSchema), async (req, res, next) => {
  try {
    const { title, description, category, users, color } = req.body;
    const newTask = { title, description, category, users, color };

    res.status(Created).json(HttpResponse.created(Task.create(newTask)));
  } catch (err) {
    next(err);
  }
});
// Cập nhật task - U
taskRouter.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  let check = Task.updateById(id, { title, description });
  if (check) {
    res.json({ updated: true });
  } else {
    res.status(400).json({ error: "Task not found" });
  }
});

// Cập nhật task - U
taskRouter.patch("/:id", validate(updateTaskSchema), async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  let task = Task.findById(id);
  if (task) {
    res.json({
      updated: Task.updateById(id, {
        title: title ?? task.title,
        description: description ?? task.description,
      }),
    });
  } else {
    res.status(BadRequest).json({ error: "Task not found" });
  }
});
// Xóa task - D
taskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let check = Task.deleteById(id);
  if (check) {
    res.status(NoContent).json({ deleted: true });
  } else {
    res.status(BadRequest).json({ error: "Task not found" });
  }
});
