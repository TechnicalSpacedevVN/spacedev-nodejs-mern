import { Router } from "express";
import { User } from "../models/user.model";
import { HttpResponse } from "../utils/HttpResponse";
import Joi from "joi";
import { validate } from "../middlewares/validate.middleware";
import {validatePassowrd} from '../utils/validate'

export const userRouter = Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.required().custom(validatePassowrd),
});

userRouter
  .get("", (req, res) => {
    res.json(HttpResponse.Paginate(User.find(req.query)));
  })
  .get("/:id", (req, res) => {})
  .post("", (req, res) => {
    const { name } = req.body;
    res.json(User.create({ name }));
  })
  .put("/:id", (req, res) => {
    const { name, avatar } = req.body;
    const { id } = req.params;
    let check = User.updateById(id, { name, avatar });
    if (check) {
      res.json({ updated: true });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  })
  .delete("/:id", (req, res) => {
    let check = User.deleteById(req.params.id);
    if (check) {
      res.json({ deleted: true });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  })
  .post("/register", validate(registerSchema), (req, res) => {
    res.json(HttpResponse.success({ success: true }));
  });
