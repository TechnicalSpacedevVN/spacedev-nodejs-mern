import { Router } from "express";
import { Category } from "../models/category.model";
import { HttpResponse } from "../utils/HttpResponse";

export const categoryRouter = Router();

categoryRouter.get("", (req, res) => {
  res.json(HttpResponse.paginate(Category.find(req.query)));
});

categoryRouter.post("", (req, res) => {
  const { name } = req.body;
  res.status(201).json(HttpResponse.created(Category.create({ name })));
});

categoryRouter.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  let check = Category.updateById(id, { name });
  if (check) {
    res.json(HttpResponse.updated(check));
  } else {
    res.status(400).json(HttpResponse.error("Category not found"));
  }
});

categoryRouter.delete("/:id", (req, res) => {
  let check = Category.deleteById(req.params.id);
  if (check) {
    res.status(204).json(HttpResponse.deleted(check));
  } else {
    res.status(400).json(HttpResponse.error("Category not found"));
  }
});
