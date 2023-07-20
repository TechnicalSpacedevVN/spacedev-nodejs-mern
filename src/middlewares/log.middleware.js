import moment from "moment/moment";
import fs from "fs";

export const logMiddleware = (req, res, next) => {
  let log = `\n${req.method}: ${req.url} - ${moment().format(
    "DD/MM/YYYY"
  )}: ${JSON.stringify(req.body)}`;
  console.log(log);

  fs.appendFile(`./logs/${moment().format("DD-MM-YYYY")}.txt`, log, () => {});

  next();
};
