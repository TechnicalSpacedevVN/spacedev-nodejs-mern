import { Router } from "express";
import { User } from "../models/user.model";

export const userRouter = Router();

userRouter.get("", (req, res) => {
  res.json(User.find(req.query));
});
userRouter.get("/:id", (req, res) => {});
userRouter.post("", (req, res) => {
  const { name } = req.body;
  res.json(User.create({ name }));
});
userRouter.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  let check = User.updateById(id, { name });
  if (check) {
    res.json({ updated: true });
  } else {
    res.status(400).json({ error: "User not found" });
  }
});
userRouter.delete("/:id", (req, res) => {
  let check = User.deleteById(req.params.id);
  if (check) {
    res.json({ deleted: true });
  } else {
    res.status(400).json({ error: "User not found" });
  }
});
