const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const userModel = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/status-codes');

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch((err) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
      console.log(err.name);
      console.log(err.stack);
    });
};

const getUserById = (req, res) => {
  userModel
    .findById(req.params.user_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
        console.log(err.name);
        console.log(err.stack);
        return;
      }
      if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        console.log(err.name);
        console.log(err.stack);
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
      console.log(err.name);
      console.log(err.stack);
    });
};

// Добавление пользователя
const createUser = (req, res) => {
  userModel
    .create(req.body)
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
        console.log(err.name);
        console.log(err.stack);
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
      console.log(err.name);
      console.log(err.stack);
    });
};

const updateUser = (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, about: req.body.about },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
        console.log(err.name);
        console.log(err.stack);
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
      console.log(err.name);
      console.log(err.stack);
    });
};

const updateUserAvatar = (req, res) => {
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true }
    )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
        return;
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
      console.log(err.name);
      console.log(err.stack);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
