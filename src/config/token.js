export const AUTH = {
  SCERET_KEY: process.env.JWT_SECRET || "",
  EXPIRED_IN: process.env.JWT_EXPIRED_IN || "10m",
  REFRESH_EXPIRED_IN: process.env.JWT_REFRESH_EXPIRED_IN || "1h",
};
