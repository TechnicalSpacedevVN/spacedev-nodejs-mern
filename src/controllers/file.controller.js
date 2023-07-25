import { HttpResponse } from "../utils/HttpResponse";

export const FileController = {
  uploadSingle: (req, res, next) => {
    res.json(
      HttpResponse.success({
        filename: `/upload/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype,
      })
    );
  },
  uploadMulti: (req, res, next) => {
    let resData = req.files.map((e) => ({
      filename: `/upload/${e.filename}`,
      size: e.size,
      mimetype: e.mimetype,
    }));

    res.json(HttpResponse.success(resData));
  },
};
