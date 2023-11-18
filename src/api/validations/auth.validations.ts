import Joi from "joi";
export default {
  newPassword: Joi.object({
    token: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  verifyMail: Joi.object({
    email: Joi.string().email(),
    code: Joi.string(),
  }),
  sendVerifyMail: Joi.object({
    email: Joi.string().email(),
  }),
  forgotPassword: Joi.object({
    email: Joi.string().email().required(),
  }),
};
