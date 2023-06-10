const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line operator-linebreak
const regex =
  /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

// const validateDeleteCard = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().alphanum().length(24),
//   }),
// });

const validateСardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validateCreateUser,
  validateLoginUser,
  validateUpdateUserAvatar,
  validateUserId,
  validateCreateCard,
  // validateDeleteCard,
  validateСardId,
};
