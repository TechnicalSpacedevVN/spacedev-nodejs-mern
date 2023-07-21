import { Router } from "express";

export const pageRouter = Router();

pageRouter
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/courses", (req, res) => {
    res.render("course-list");
  })
  .get("/courses/:id", (req, res) => {
    res.render("course-detail");
  });
