import { NotFound } from "../config/StatusCode";
import { Category } from "../models/category.model";
import { HttpResponse } from "../utils/HttpResponse";

export const CategoryController = {
  get: async (req, res) => {
    res.json(HttpResponse.Paginate(await Category.paginate(req.query)));
  },
  getDetail: async (req, res) => {
    let detail = await Category.findById(req.params.id);
    if (detail) {
        return res.json(HttpResponse.detail(detail))
    }

    res.status(NotFound).json(HttpResponse.notFound("Không tìm thấy thể loại"));
  },
  updateById: async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    let check = await Category.updateById(id, { name });
    if (check) {
      res.json({ updated: true });
    } else {
      res.status(400).json(HttpResponse.error("Category not found"));
    }
  },
  create: async (req, res) => {
    const { name } = req.body;
    res.json(HttpResponse.created(await Category.create({ name })));
  },
  deleteById: async (req, res) => {
    let check = Category.deleteById(req.params.id);
    if (check) {
      res.json({ deleted: true });
    } else {
      res.status(400).json(HttpResponse.error("Category not found"));
    }
  },
};
