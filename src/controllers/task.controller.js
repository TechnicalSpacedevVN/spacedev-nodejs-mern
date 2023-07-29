import _ from "lodash";
import { BadRequest, Created, NoContent } from "../config/StatusCode";
import { Task } from "../models/task.model";
import { HttpResponse } from "../utils/HttpResponse";
import { DEFAULT_LIMIT } from "../config/database";

export const TaskController = {
  count: async (req, res) => {
    let { page = 1 } = req.query;
    page = parseInt(page);
    let _query = _.omit(req.query, "page");

    res.json(HttpResponse.success({ count: await Task.count(_query) }));
  },
  get: async (req, res) => {
    // let { page = 1, sort } = req.query;
    // let categoryName = req.query?.["category.name"] || '';
    // let categories = categoryName ? categoryName.split(",") : [];

    // page = parseInt(page);
    // let _query = _.omit(req.query, "page", "sort", "category.name");
    // let _sort = sort?.split(",") || ["_id", "desc"];
    // let sortBy, sortValue;
    // if (_sort.length === 2) {
    //   sortBy = _sort[0];
    //   sortValue = _sort[1];
    // } else {
    //   if (sort === "newwest") {
    //     sortBy = ".....";
    //     sortValue = "desc";
    //   }
    // }

    // console.log(categories)
    // if (categories.length) {
    //   _query["category.name"] = { $in: categories };
    // }

    res.json(HttpResponse.Paginate(await Task.paginate(req.query)));
  },
  getDetail: async (req, res) => {
    // await delay(2000);
    let t = Task.findById(req.params.id);
    if (t) {
      return res.json(Task.findById(req.params.id));
    }

    res.status(BadRequest).json({ error: "Task Not found" });
  },
  create: async (req, res, next) => {
    try {
      const { title, description, category, users, color, startDate } =
        req.body;
      const newTask = {
        title,
        description,
        category,
        users,
        color,
        startDate,
        isDone: false,
      };

      let result = await Task.create(newTask);
      res.status(Created).json(HttpResponse.created(result));
    } catch (err) {
      next(err);
    }
  },
  updateById: async (req, res) => {
    const { title, description, isDone } = req.body;
    const { id } = req.params;

    let check = await Task.updateById(id, { title, description, isDone });
    if (check) {
      res.json({ updated: true });
    } else {
      res.status(400).json({ error: "Task not found" });
    }
  },
  updatePartial: async (req, res) => {
    const { title, description, isDone } = req.body;
    const { id } = req.params;
    let task = await Task.findById(id);
    if (task) {
      res.json({
        updated: await Task.updateById(id, {
          title: title ?? task.title,
          description: description ?? task.description,
          isDone: isDone ?? task.isDone,
        }),
      });
    } else {
      res.status(BadRequest).json({ error: "Task not found" });
    }
  },
  deleteById: async (req, res) => {
    const { id } = req.params;
    let check = await Task.deleteById(id);
    if (check) {
      res.status(NoContent).json({ deleted: true });
    } else {
      res.status(BadRequest).json({ error: "Task not found" });
    }
  },
  getCategory: async (req, res) => {
    let { id } = req.params;
    let category = await Task.getCategory(id);
    res.json(HttpResponse.success(category))
  },
};
