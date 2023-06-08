const jwt = require('jsonwebtoken');

const SECRET_KEY = 'abra-shvabra-kadabra';

const checkToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};

module.exports = {
  checkToken,
  signToken,
};
