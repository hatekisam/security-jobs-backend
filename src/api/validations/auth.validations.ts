import Joi from "joi";
export default {
  newPassword: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().email().required(),
  }),
  verifyMail: Joi.object({
    email: Joi.string().email(),
    code:Joi.string(),
  }),
  sendVerifyMail: Joi.object({
    email: Joi.string().email(),
  }),
};
