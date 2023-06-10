const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/status-codes');

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: 'Пользователь не авторизован' });
};

const SECRET_KEY = 'abra-shvabra-kadabra';
// const { checkToken } = require('../utils/jwtAuth');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return handleAuthError(res);
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
