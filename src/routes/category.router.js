import { Router } from "express";
import { Category } from "../models/category.model";
import { HttpResponse } from "../utils/HttpResponse";
import { BadRequest, NotFound } from "../config/StatusCode";

export const categoryRouter = Router();

categoryRouter
  .get("", async (req, res) => {
    res.json(HttpResponse.Paginate(await Category.find(req.query)));
  })
  .get("/:id", async (req, res, next) => {
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
      next(err)
    }
  });

categoryRouter.post("", async (req, res) => {
  const { name } = req.body;
  res.json(HttpResponse.created(await Category.create({ name })));
});

categoryRouter.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  let check = await Category.updateById(id, { name });
  if (check) {
    res.json(HttpResponse.updated(check));
  } else {
    res.status(400).json(HttpResponse.error("Category not found"));
  }
});

categoryRouter.delete("/:id", (req, res) => {
  let check = Category.deleteById(req.params.id);
  if (check) {
    res.json({ deleted: true });
  } else {
    res.status(400).json(HttpResponse.error("Category not found"));
  }
});
