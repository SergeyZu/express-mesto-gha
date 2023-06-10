// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
// const UnauthorizedError = require('../errors/UnauthorizedError');
// const { signToken } = require('../utils/jwtAuth');
const userModel = require('../models/user');

const SECRET_KEY = 'abra-shvabra-kadabra';

const getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
  // .catch((err) => {
  //   res
  //     .status(INTERNAL_SERVER_ERROR)
  //     .send({ message: 'Internal Server Error' });
  //   console.log(err);
  // });
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
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res
  //       .status(BAD_REQUEST)
  //       .send({ message: 'Введены некорректные данные' });
  //     console.log(err);
  //   } else if (err instanceof NotFoundError) {
  //     res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
  //     console.log(err);
  //   } else {
  //     res
  //       .status(INTERNAL_SERVER_ERROR)
  //       .send({ message: 'Internal Server Error' });
  //     console.log(err);
  //   }
  // });
};

const getUserData = (req, res, next) => {
  userModel
    // .findOne({ _id: req.user._id })
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res
  //       .status(BAD_REQUEST)
  //       .send({ message: 'Введены некорректные данные' });
  //     console.log(err);
  //   } else if (err instanceof NotFoundError) {
  //     res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
  //     console.log(err);
  //   } else {
  //     res
  //       .status(INTERNAL_SERVER_ERROR)
  //       .send({ message: 'Internal Server Error' });
  //     console.log(err);
  //   }
  // });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    console.log('hash:', hash);

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
    // .catch((err) => {
    //   if (err instanceof mongoose.Error.ValidationError) {
    //     res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
    //     console.log(err);
    //   } else if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
    //     res.status(CONFLICT).send({
    //       message: 'Пользователь с таким email уже зарегистрирован',
    //     });
    //     console.log(err);
    //   } else {
    //     res
    //       .status(INTERNAL_SERVER_ERROR)
    //       .send({ message: 'Internal Server Error' });
    //     console.log(err);
    //   }
    // });
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
      // const token = signToken({ _id: user._id });
      // console.log('token:', token);
      res.status(200).send({ token });
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof UnauthorizedError) {
  //     res
  //       .status(UNAUTHORIZED)
  //       .send({ message: 'Неправильные почта или пароль' });
  //     console.log(err);
  //   } else {
  //     res
  //       .status(INTERNAL_SERVER_ERROR)
  //       .send({ message: 'Internal Server Error' });
  //     console.log(err);
  //   }
  // });
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
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.ValidationError) {
  //     res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
  //     console.log(err);
  //   } else {
  //     res
  //       .status(INTERNAL_SERVER_ERROR)
  //       .send({ message: 'Internal Server Error' });
  //     console.log(err);
  //   }
  // });
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
  // .catch((err) => {
  //   if (err.name === 'BadRequestError') {
  //     // if (err instanceof mongoose.Error.ValidationError) {
  //     res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
  //   } else {
  //     res
  //       .status(INTERNAL_SERVER_ERROR)
  //       .send({ message: 'Internal Server Error' });
  //     console.log(err);
  //   }
  // });
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
