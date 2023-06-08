// const mongoose = require('mongoose');
const { checkToken } = require('../utils/jwtAuth');
const { UNAUTHORIZED } = require('../utils/status-codes');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Пользователь не авторизован' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = checkToken(token);

    req.user = payload;
    // req.user = {
    //   _id: new mongoose.Types.ObjectId(payload._id),
    // };
    next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Пользователь не авторизован' });
  }
};

module.exports = {
  auth,
};
