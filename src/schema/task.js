import Joi from "joi";
import { CategoryRepository } from "../repository/category.repository";
import { User } from "../repository/user.repository";

export const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().optional().allow(null),
  category: Joi.custom(async (value, helper) => {
    if (!(await CategoryRepository.findById(value))) {
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

export const createTaskSchema = updateTaskSchema.fork(
  ["title", "category"],
  (schema) => schema.required()
);
