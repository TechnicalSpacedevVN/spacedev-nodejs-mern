import { NotFound } from "../config/StatusCode";
import { User } from "../models/user.model";
import { HttpResponse } from "../utils/HttpResponse";

export const UserController = {
  get: async (req, res) => {
    res.json(HttpResponse.Paginate(await User.find(req.query)));
  },
  getDetail: async (req, res) => {
    let detail = await User.findById(req.params.id)
    if(detail) {
        return res.json(HttpResponse.detail(await User.findById(req.params.id)));
    }

    res.status(NotFound).json(HttpResponse.notFound("Không tìm thấy user"))

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
  register: (req, res) => {
    res.json(HttpResponse.success({ success: true }));
  },
};
