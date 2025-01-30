const Joi = require("joi");

// Your existing user schema
const userSchema = Joi.object({
  name: Joi.string().min(3).pattern(/^[A-Za-z\s]+$/).required().messages({
    "string.pattern.base": "Name must contain only letters and spaces.",
  }),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character.",
    }),
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
});

// Password reset validation schema
const resetPasswordSchema = Joi.object({
 email: Joi.string().email().required(),  
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character.",
    }),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateResetPassword = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateUser, validateResetPassword };
