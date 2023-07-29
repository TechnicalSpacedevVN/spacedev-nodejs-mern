import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../schema/user";
import { jwtMiddleware } from "../middlewares/jwt.middleware";

export const userRouter = Router();

userRouter
  .get("",UserController.get)
  .get("/:id", UserController.getDetail)
  .post("", UserController.create)
  .put("/:id", UserController.updateById)
  .delete("/:id", UserController.deleteById)
  .post("/register", validate(registerSchema), UserController.register)
  .post('/update-info',jwtMiddleware, UserController.updateInfor);
