import { Router } from "express";
import { upload } from "../middlewares/file.middleware";

export const fileRouter = Router()

fileRouter.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        filename: `/upload/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype
    })
})