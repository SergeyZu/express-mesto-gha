// const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/status-codes');

const SECRET_KEY = 'abra-shvabra-kadabra';
// const { checkToken } = require('../utils/jwtAuth');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Пользователь не авторизован' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);

    // req.user = {
    //   _id: new mongoose.Types.ObjectId(payload._id),
    // };
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Пользователь не авторизован' });
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
