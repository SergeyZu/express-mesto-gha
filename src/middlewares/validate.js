const { celebrate, Joi } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required(),
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
      owner: Joi.string().required(),
      likes: Joi.string().required(),
      createdAt: Joi.date().required(),
    })
    .unknown(true),
});

module.exports = {
  validateUser,
  validateCard,
};
