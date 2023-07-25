import { Router } from "express";
import { FileController } from "../controllers/file.controller";
import { upload } from "../middlewares/file.middleware";

export const fileRouter = Router();

fileRouter.post("/upload", upload.single("file"), FileController.uploadSingle);

fileRouter.post("/uploads", upload.array("files"), FileController.uploadMulti);
