import { Router } from "express";
import { Category } from "../models/category.model";

export const categoryRouter = Router();

categoryRouter.get("", (req, res) => {
  res.json(Category.find(req.query));
});

categoryRouter.post("", (req, res) => {
  const { name } = req.body;
  res.json(Category.create({ name }));
});

categoryRouter.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  let check = Category.updateById(id, { name });
  if (check) {
    res.json({ updated: true });
  } else {
    res.status(400).json({ error: "Category not found" });
  }
});

categoryRouter.delete("/:id", (req, res) => {
  let check = Category.deleteById(req.params.id);
  if (check) {
    res.json({ deleted: true });
  } else {
    res.status(400).json({ error: "Category not found" });
  }
});
