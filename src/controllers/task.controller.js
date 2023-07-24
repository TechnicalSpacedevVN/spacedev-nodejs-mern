import { BadRequest, Created, NoContent } from "../config/StatusCode";
import { HttpResponse } from "../utils/HttpResponse";
import { Task } from "../repository/task.repository";

export const TaskController = {
  get: async (req, res, next) => {
    try {
      res.json(HttpResponse.Paginate(await Task.find(req.query)));
    } catch (err) {
      next(err);
    }
  },
  getDetail: async (req, res, next) => {
    try {
      // await delay(2000);
      let t = Task.findById(req.params.id);
      if (t) {
        return res.json(Task.findById(req.params.id));
      }

      res.status(BadRequest).json({ error: "Task Not found" });
    } catch (err) {
      next(err);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      const { id } = req.params;
      let check = Task.deleteById(id);
      if (check) {
        res.status(NoContent).json({ deleted: true });
      } else {
        res.status(BadRequest).json({ error: "Task not found" });
      }
    } catch (err) {
      next(err);
    }
  },
  updateById: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { id } = req.params;

      let check = Task.updateById(id, { title, description });
      if (check) {
        res.json({ updated: true });
      } else {
        res.status(400).json({ error: "Task not found" });
      }
    } catch (err) {
      next(err);
    }
  },
  updatePartialById: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { id } = req.params;
      let task = Task.findById(id);
      if (task) {
        res.json({
          updated: Task.updateById(id, {
            title: title ?? task.title,
            description: description ?? task.description,
          }),
        });
      } else {
        res.status(BadRequest).json({ error: "Task not found" });
      }
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { title, description, category, users, color } = req.body;
      const newTask = { title, description, category, users, color };

      res
        .status(Created)
        .json(HttpResponse.created(await Task.create(newTask)));
    } catch (err) {
      next(err);
    }
  },
};
