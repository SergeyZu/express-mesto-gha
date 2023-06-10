const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const userModel = require('../models/user');

const SECRET_KEY = 'abra-shvabra-kadabra';

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.user_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const getUserData = (req, res, next) => {
  userModel
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    userModel
      .create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
      .then((user) => {
        res.status(201).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        });
      })
      .catch(next);
  });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  getUserData,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
};
