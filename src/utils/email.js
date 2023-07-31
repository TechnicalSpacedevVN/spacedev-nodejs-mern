import nodemaler from "nodemailer";
import { EMAIL } from "../config";
import _ from "lodash";

const transporter = nodemaler.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL.USER,
    pass: EMAIL.PASS,
  },
});
export const sendMail = async (options) => {
  let _options = _.omit(options, "data");
  let { data } = options;

  for(let i in data) {
    _options.html = _options.html.replace(`##${i}##`, data[i])
  }

  let info = await transporter.sendMail(_options);
  console.log(info.messageId);
};
