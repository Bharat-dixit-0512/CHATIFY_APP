import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

const isProduction = ENV.NODE_ENV === "production";

export const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
};

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, cookieOptions);
  return token;
};
