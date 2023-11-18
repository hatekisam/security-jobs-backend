import Joi from "joi";
export default {
  newCompany: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    location: Joi.string().optional(),
  }),
};
