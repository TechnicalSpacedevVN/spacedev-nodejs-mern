import { Router } from "express";
import { User } from "../models/user.model";
import { HttpResponse } from "../utils/HttpResponse";

export const userRouter = Router();

userRouter.get("", (req, res) => {
  res.json(HttpResponse.paginate(User.find(req.query)));
});
userRouter.get("/:id", (req, res) => {});
userRouter.post("", (req, res) => {
  const { name } = req.body;
  res.status(201).json(HttpResponse.created(User.create({ name })));
});
userRouter.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  let check = User.updateById(id, { name });
  if (check) {
    res.json(HttpResponse.updated(check));
  } else {
    res.status(400).json(HttpResponse.error("User not found"));
  }
});
userRouter.delete("/:id", (req, res) => {
  let check = User.deleteById(req.params.id);
  if (check) {
    res.json(HttpResponse.deleted(check));
  } else {
    res.status(400).json(HttpResponse.error("User not found"));
  }
});
