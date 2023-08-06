import nodemailer from "nodemailer";
import { EMAIL } from "../config";
import _ from "lodash";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL.USER,
    pass: EMAIL.PASS,
  },
});

type Options = {
  html: string;
  subject: string;
  from: string;
  to: string;
  data: any;
};

export const sendMail = async (options: Options) => {
  let _options = _.omit(options, "data");
  let { data } = options;
  if (data) {
    for (let i in data) {
      _options.html = _options.html.replace(`##${i}##`, data[i]);
    }
  }

  let info = await transporter.sendMail(_options);
  console.log(info.messageId);
};
