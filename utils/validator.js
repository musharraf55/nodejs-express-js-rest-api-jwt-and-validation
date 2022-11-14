import joi from "joi";
import password from "joi-password-complexity";

const validate = (data) => {
  const schema = joi.object({
    name: joi.string().required().label("name"),
    email: joi.string().required().label("email"),
    password: password().required().label("password"),
  });
  return schema.validate(data);
};
export default validate;
