import { Router } from "express";
import { delay } from "../utils/delay";

const tasks = [];

export const taskRouter = Router();

// CRUD - Create - Read - Update - Delete

// Lấy danh sách tásk - R
taskRouter.get("", async (req, res) => {
  // await delay(2000);
  res.json(tasks);
});
// tạo task - C
taskRouter.post("", async (req, res) => {
  await delay(2000);

  console.log("Create Task", req.body);
  const { title, description } = req.body;
  const newTask = { title, description, id: new Date().getTime() };
  tasks.push(newTask);
  res.json({ task: newTask });
});
// Cập nhật task - U
taskRouter.put("/:id", async (req, res) => {
  await delay(2000);

  const { title, description } = req.body;
  const { id } = req.params;

  const t = tasks.find((e) => e.id === parseInt(id));
  if (t) {
    t.title = title;
    t.description = description;
    res.json({ update: true });
  } else {
    res.json({ error: "Task not found" });
  }
});

// Cập nhật task - U
taskRouter.patch("/:id", async (req, res) => {
  await delay(2000);

  const { title, description } = req.body;
  const { id } = req.params;

  const t = tasks.find((e) => e.id === parseInt(id));
  if (t) {
    t.title = title || t.title;
    t.description = description || t.description;
    res.json({ update: true });
  } else {
    res.json({ error: "Task not found" });
  }
});
// Xóa task - D
taskRouter.delete("/:id", async (req, res) => {
  await delay(2000);

  const { id } = req.params;
  const index = tasks.findIndex((e) => e.id === parseInt(id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ delete: true });
  } else {
    res.status(400).json({ error: "Task not found" });
  }
});
