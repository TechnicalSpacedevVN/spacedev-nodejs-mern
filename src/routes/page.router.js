import { Router } from "express";

export const pageRouter = Router();

pageRouter
  .get("/", (req, res) => {
    res.render(`home`, { title: "Spacedev MERN Typescript" });
  })
  .get("/courses", (req, res) => {
    res.render("course-list");
  })
  .get("/courses/:id", (req, res) => {
    res.render("course-detail");
  })
  .get("/graphql-page", (req, res) => {
    res.render("graphql-sandbox", { layout: false });
  });
