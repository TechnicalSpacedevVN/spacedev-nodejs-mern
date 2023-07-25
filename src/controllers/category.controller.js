import _ from "lodash";
import { NoContent, NotFound } from "../config/StatusCode";
import { Category } from "../models/category.model";
import { HttpResponse } from "../utils/HttpResponse";

export const CategoryController = {
  get: async (req, res, next) => {
    try {
      res.json(HttpResponse.Paginate(await Category.find(req.query)));
    } catch (err) {
      next(err);
    }
  },
  getDetail: async (req, res, next) => {
    try {
      let detail = await Category.findById(req.params.id);
      if (detail) {
        res.json(HttpResponse.detail(detail));
      } else {
        res
          .status(NotFound)
          .json(HttpResponse.error("Không tìm thấy dữ liệu", NotFound));
      }
    } catch (err) {
      next(err);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      let check = await Category.deleteById(req.params.id);
      if (check) {
        res.status(NoContent).json({ deleted: true });
      } else {
        res
          .status(NotFound)
          .json(HttpResponse.error("Category not found", NotFound));
      }
    } catch (err) {
      next(err);
    }
  },
  updatedById: async (req, res, next) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      let check = await Category.updateById(id, { name });
      if (check) {
        res.json(HttpResponse.updated(check));
      } else {
        res.status(400).json(HttpResponse.error("Category not found"));
      }
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, err) => {
    try {
      const { name } = req.body;
      res.json(HttpResponse.created(await Category.create({ name })));
    } catch (err) {
      next(err);
    }
  },
};
