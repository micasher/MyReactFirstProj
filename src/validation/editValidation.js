import Joi from "joi";

import validation from "./validation";

const editCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  state: Joi.string().min(2).max(256).required(),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(2).max(256).required(),
  phone: Joi.string().min(9).max(14).required(),
  url: Joi.string().min(6).max(1024).required(),
  alt: Joi.string().min(2).max(256).required(),
  web: Joi.string().min(5).max(255).allow(""),
  zipCode: Joi.number().min(2).max(256).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };

export default validateEditSchema;
