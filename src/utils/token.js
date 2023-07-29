import jsonwebtoken from "jsonwebtoken";
import { AUTH } from "../config/token";
export const verify = (value) => {
  return jsonwebtoken.verify(value, AUTH.SCERET_KEY, {});
};

export const generateToken = (data) => {
  return jsonwebtoken.sign(data, AUTH.SCERET_KEY, {
    expiresIn: AUTH.EXPIRED_IN,
  });
};

export const generateRefresh = () => {
  return jsonwebtoken.sign(data, AUTH.SCERET_KEY, {
    expiresIn: AUTH.REFRESH_EXPIRED_IN,
  });
};
