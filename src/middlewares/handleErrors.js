const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

// eslint-disable-next-line no-unused-vars
const handleErrors = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    res.status(400).send({ message: 'Запрос невалидный' });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).send({ message: 'Не указаны авторизационные данные' });
  } else if (err instanceof ForbiddenError) {
    res.status(403).send({ message: 'Неверные авторизационные данные' });
  } else if (err instanceof NotFoundError) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  } else if (err instanceof ConflictError) {
    res.status(409).send({ message: 'Запрос вызвал конфликт' });
  } else if (err.code === 11000) {
    res
      .status(409)
      .send({ message: 'Пользователь с таким email уже зарегистрирован' });
  } else {
    // если у ошибки нет статуса, выставляем 500
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({
      message: statusCode === 500 ? 'Ошибка сервера' : message,
    });
  }
};

module.exports = { handleErrors };
