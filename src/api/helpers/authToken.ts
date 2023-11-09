import jwt from "jsonwebtoken";
import config from "../../config/config";
import { Role } from "../interfaces/Role";
export interface Payload {
  id: string;
  email: string;
  name: string;
}

export const createAuthToken = (payload: Payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAuthToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
