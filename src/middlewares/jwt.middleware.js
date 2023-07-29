import jsonwebtoken from "jsonwebtoken";
import { AUTH } from "../config/auth";
export const jwtMiddleware = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return next("Api yêu cầu quyền truy cập");
  }

  let check = jsonwebtoken.verify(
    authorization.replace("Bearer ", ""),
    AUTH.SECRET_KEY
  );
  if (check) {
    req.user = check._id;
    return next();
  }

  next("Token invalid");
};
