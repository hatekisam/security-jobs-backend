import Joi from "joi";
import { LoginAccount, NewAccount } from "api/interfaces/Account";
export default {
  newAccount: Joi.object<NewAccount>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).max(25).required(),
  }),
  verifyEmail: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(4),
  }),
  loginAccount: Joi.object<LoginAccount>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  updateAccount: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).max(25).optional(),
    phone: Joi.string().optional(),
  }),
  becomeUser: Joi.object({
    username: Joi.string().required(),
  }),
};
