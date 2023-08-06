import { BadRequest, NotFound } from "../config/StatusCode";
import { User, UserModel } from "../models/user.model";
import { HttpResponse } from "../utils/HttpResponse";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail";
import { randomCode } from "../utils/randomCode";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { NextFunction, Request, Response } from "express";

// const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
const emailRegisterHtml = fs
  .readFileSync(path.join(__dirname, "../views/emails/register.html"))
  .toString();

const forfotPasswordHtml = fs
  .readFileSync(path.join(__dirname, "../views/emails/forgot-password.html"))
  .toString();

export const UserController = {
  get: async (req: Request, res: Response) => {
    res.json(HttpResponse.Paginate(await User.paginate(req.query)));
  },
  getDetail: async (req: Request, res: Response) => {
    let detail = await User.findById(req.params.id);
    if (detail) {
      return res.json(HttpResponse.detail(await User.findById(req.params.id)));
    }

    res.status(NotFound).json(HttpResponse.notFound("Không tìm thấy user"));
  },
  create: async (req: Request, res: Response) => {
    const { name, age, gender } = req.body;
    res.json(await User.create({ name, age, gender }));
  },
  updateById: async (req: Request, res: Response) => {
    const { name, avatar } = req.body;
    const { id } = req.params;
    let check = await User.updateById(id, { name, avatar });
    if (check) {
      res.json({ updated: true });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    let check = await User.deleteById(req.params.id);
    if (check) {
      res.json({ deleted: true });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  },
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let check = await UserModel.findOne({ email: req.body.email });
      if (check) {
        return res
          .status(BadRequest)
          .json(HttpResponse.error("Email này đã tồn tại"));
      }

      let { password, email } = req.body;
      password = crypto.createHash("sha256").update(password).digest("hex");
      let code = randomCode(100);

      let user = await User.create({ ...req.body, password, code });
      // user.password = undefined;

      await sendMail({
        from: '"Spacedev.vn 👻" <study@spacedev.vn>', // sender address
        to: email, // list of receivers
        subject: "Kích hoạt tài khoản spacedev.vn", // Subject line
        html: emailRegisterHtml, // html body
        data: {
          link: `http://localhost:8000/user/verify-register?code=${code}&email=${email}`,
        },
      });

      res.json(HttpResponse.success(user));
    } catch (err) {
      next(err);
    }
  },
  updateInfor: async (req: any, res: Response, next: NextFunction) => {
    try {
      let { name } = req.body;
      let user = await UserModel.findOne({ _id: req.user });
      if (user) {
        user.name = name;
        await user.save();
      }
      res.json(HttpResponse.success(true));
    } catch (err) {
      next(err);
    }
  },
  verifyRegister: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { code, email } = req.query;
      let user = await UserModel.findOne({
        email,
        code,
        verify: false,
      });
      if (user) {
        user.verify = true;
        user.code = '';
        await user.save();
        return res.json({ success: true });
      }

      return res.status(BadRequest).json(HttpResponse.error("Thao tác lỗi"));
    } catch (err) {
      next(err);
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, redirect } = req.body;
      let user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(BadRequest)
          .json(HttpResponse.error("User này không tồn tại"));
      }

      let code = randomCode(100);
      user.code = code;
      await user.save();
      await sendMail({
        from: '"Spacedev.vn 👻" <study@spacedev.vn>', // sender address
        to: email, // list of receivers
        subject: "Tìm lại tài khoản spacedev.vn", // Subject line
        html: forfotPasswordHtml, // html body
        data: {
          link: `${redirect}?code=${code}&email=${email}`,
        },
      });
      res.json(
        HttpResponse.success("Vui lòng kiểm tra email để tìm lại mật khẩu")
      );
    } catch (err) {
      next(err);
    }
  },
  resetPasswordByCode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { code, email, newPassword } = req.body;
      let user = await UserModel.findOne({
        email,
        code,
      });
      if (user) {
        user.code = '';
        let password = crypto
          .createHash("sha256")
          .update(newPassword)
          .digest("hex");
        user.password = password;

        await user.save();
        return res.json(HttpResponse.success("Reset password thành công"));
      }

      return res.status(BadRequest).json(HttpResponse.error("Thao tác lỗi"));
    } catch (err) {
      next(err);
    }
  },
};
