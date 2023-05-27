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
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

// const getUserById = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.params.userId);

//     if (!req.params.userId) {
//       throw new NotFoundError('Пользователь не найден');
//     }
//     res.send({ data: user });
//   } catch (err) {
//     if (err instanceof mongoose.Error.ValidationError) {
//       res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
//       return;
//     }
//     if (err instanceof mongoose.Error.CastError) {
//       res.status(BAD_REQUEST).send({ message: 'Введены некорректные данные' });
//       return;
//     }
//     if (err instanceof NotFoundError) {
//       res.status(BAD_REQUEST).send({ message: 'Пользователь не найден' });
//       return;
//     }
//     res.status(INTERNAL_SERVER_ERROR).send({
//       message: 'Internal Server Error',
//       err: err.message,
//       stack: err.stack,
//     });
//   }
// };

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
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
        return;
      }
      if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
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
        res.status(BAD_REQUEST).send({
          message: 'Ошибка валидации',
          name: err.name,
          stack: err.stack,
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
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
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send({
          message: 'Ошибка валидации',
          name: err.name,
          stack: err.stack,
        });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const updateUserAvatar = (req, res) => {
  // const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
