import Joi from "joi";
import { LoginUser, NewUser } from "../interfaces/User";
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
  updateUser: Joi.object({
    about:Joi.string().optional(),
    
  }),
};
