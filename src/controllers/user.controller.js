import _ from "lodash";
import { NoContent } from "../config/StatusCode";
import { User } from "../models/user.model";
import { HttpResponse } from "../utils/HttpResponse";
import { DEFAULT_LIMIT } from "../config/database";

export const UserController = {
  get: async (req, res, next) => {
    try {
      let query = _.omit(req.query, "page", "sort");
      // res.json(HttpResponse.Paginate(await User.find(req.query)));
      res.json(
        HttpResponse.Paginate(
          await User.paginate(query, parseInt(req.query.page || 1))
        )
      );
    } catch (err) {
      next(err);
    }
  },
  getDetail: async (req, res, next) => {
    res.json(HttpResponse.detail(await User.findById(req.params.id)));
    try {
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      res.json(HttpResponse.created(await User.create({ name })));
    } catch (err) {
      next(err);
    }
  },
  updateById: async (req, res, next) => {
    try {
      const { name, avatar } = req.body;
      const { id } = req.params;
      let check = await User.updateById(id, { name, avatar });
      if (check) {
        res.json(HttpResponse.updated(check));
      } else {
        res.status(400).json({ error: "User not found" });
      }
    } catch (err) {
      next(err);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      let check = User.deleteById(req.params.id);
      if (check) {
        res.status(NoContent).json(HttpResponse.deleteById(check));
      } else {
        res.status(400).json({ error: "User not found" });
      }
    } catch (err) {
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      res.json(HttpResponse.success({ success: true }));
    } catch (err) {
      next(err);
    }
  },
};
