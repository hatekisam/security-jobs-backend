import Joi from "joi";
import { LoginUser, NewUser } from "../interfaces/User";
import idValidation from "./id.validation";
export default {
  // newUser: Joi.object<NewUser>({
  //   name: Joi.string().required(),
  //   email: Joi.string().email().required(),
  //   bio: Joi.string().required(),
  //   phone: Joi.string().required(),
  //   profile: Joi.string().optional(),
  //   password: Joi.string().min(8).max(25).required(),
  // }),
  // loginUser: Joi.object<LoginUser>({
  //   email: Joi.string().email().required(),
  //   password: Joi.string().required(),
  // }),
  addAbout: Joi.object({
    about: Joi.string().optional(),
  }),
  addEducation: Joi.object({
    level: idValidation,
    institution: Joi.string().required(),
    field: idValidation,
    start: Joi.date().required(),
    end: Joi.date().required(),
    currentEducation: Joi.boolean().required(),
    description: Joi.string().required(),
  }),
  addWorkExperience: Joi.object({
    title: Joi.string().required(),
    company: Joi.string().required(),
    start: Joi.date().required(),
    end: Joi.date().required(),
    currentEducation: Joi.boolean().required(),
    description: Joi.string().required(),
  }),
};
