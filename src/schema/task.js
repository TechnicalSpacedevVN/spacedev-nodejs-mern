import Joi from "joi";
import { Category } from "../models/category.model";
import { User } from "../models/user.model";

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().optional().allow(null),
  category: Joi.string().external(async (value, helper) => {
    if (!(await Category.findById(value))) {
      return helper.message("Không tìm thấy category");
    }
  }),
  users: Joi.array()
    .items(Joi.string())
    .external(async (value, helper) => {
      if ((await User.findByIds(value)).length < value.length) {
        return helper.message("Không tìm thấy user");
      }
    }),
  color: Joi.string().optional().default("#ffffff"),
});

export const createTaskSchema = updateTaskSchema.fork(
  ["title", "category"],
  (schema) => schema.required()
);
