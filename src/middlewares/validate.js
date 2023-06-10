const { celebrate, Joi } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri,
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    })
    .unknown(true),
});

const validateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
    })
    .unknown(true),
});

module.exports = {
  validateUser,
  validateCard,
};
