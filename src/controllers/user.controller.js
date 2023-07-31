import { BadRequest, NotFound } from "../config/StatusCode";
import { User, UserModel } from "../models/user.model";
import { HttpResponse } from "../utils/HttpResponse";
import crypto from "crypto";
import { sendMail } from "../utils/email";
import fs from "fs";
import path from "path";
import { __dirname } from "../config";
import { randomCode } from "../utils/random";

const registerEmail = fs
  .readFileSync(path.resolve(__dirname, "../views/email/register.html"))
  .toString();

export const UserController = {
  get: async (req, res) => {
    res.json(HttpResponse.Paginate(await User.paginate(req.query)));
  },
  getDetail: async (req, res) => {
    let detail = await User.findById(req.params.id);
    if (detail) {
      return res.json(HttpResponse.detail(await User.findById(req.params.id)));
    }

    res.status(NotFound).json(HttpResponse.notFound("Không tìm thấy user"));
  },
  create: async (req, res) => {
    const { name, age, gender } = req.body;
    res.json(await User.create({ name, age, gender }));
  },
  updateById: (req, res) => {
    const { name, avatar } = req.body;
    const { id } = req.params;
    let check = User.updateById(id, { name, avatar });
    if (check) {
      res.json({ updated: true });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  },
  deleteById: (req, res) => {
    let check = User.deleteById(req.params.id);
    if (check) {
      res.json({ deleted: true });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  },
  register: async (req, res, next) => {
    try {
      let check = await UserModel.findOne({ email: req.body.email });
      if (check) {
        return res
          .status(BadRequest)
          .json(HttpResponse.error("Email này đã tồn tại"));
      }

      let { password, email } = req.body;
      password = crypto.createHash("sha256").update(password).digest("hex");

      let user = await User.create({ ...req.body, password });
      let code = randomCode(60);

      sendMail({
        from: "Spacedev.vn",
        to: email,
        subject: "Kích hoạt tài khoản spacedev.vn",
        html: registerEmail,
        data: {
          link: `http://localhost:8000/user/verify-register?email=${email}&code=${code}`,
        },
      });

      user.password = undefined;

      res.json(HttpResponse.success(user));
    } catch (err) {
      next(err);
    }
  },
  updateInfor: async (req, res, next) => {
    try {
      let { name } = req.body;
      let user = await UserModel.findOne({ _id: req.user });
      user.name = name;
      await user.save();
      res.json(HttpResponse.success(true));
    } catch (err) {
      next(err);
    }
  },
  verifyRegister: async (req, res) => {
    let { email, code } = req.query;
    let user = await UserModel.findOne({ email, code });
    if(user) {
      user.code = null
      user.isVerify = true
      await user.save()
    }
    res.json({ success: true });
  },
};
