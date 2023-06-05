const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFoundError');
const userModel = require('../models/user');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  MONGO_DUPLICATE_KEY_ERROR,
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
      } else if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
        console.log(err.name);
        console.log(err.stack);
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
        console.log(err.name);
        console.log(err.stack);
      }
    });
};

// const createUser = (req, res) => {
//   // хешируем пароль
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       // const { name, about, avatar, email, password } = req.body;
//       userModel.create({
//         name: req.body.name,
//         about: req.body.about,
//         avatar: req.body.avatar,
//         email: req.body.email,
//         password: hash,
//       });
//     })
//     .then((user) => {
//       res.status(CREATED).send(user);
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.ValidationError) {
//         res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
//         console.log(err.name);
//         console.log(err.stack);
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: 'Internal Server Error' });
//         console.log(err.name);
//         console.log(err.stack);
//       }
//     });
// };

const createUser = (req, res) => {
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
        res.status(CREATED).send(user);
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(BAD_REQUEST).send({ message: 'Ошибка валидации' });
          console.log(err);
        } else if (err.code === MONGO_DUPLICATE_KEY_ERROR) {
          res.status(CONFLICT).send({
            message: 'Пользователь с таким email уже зарегистрирован',
          });
          console.log(err);
        } else {
          res
            .status(INTERNAL_SERVER_ERROR)
            .send({ message: 'Internal Server Error' });
          console.log(err);
        }
      });
  });
};

// const createUser = (req, res) => {
//   userModel
//     .create({
//       email: req.body.email,
//       password: req.body.password,
//     })
//     .then((user) => res.send(user))
//     .catch((err) => res.status(400).send(err));
// };

const loginUser = (req, res) => {
  res.status(OK).send({ message: 'OK' });
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
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
        console.log(err.name);
        console.log(err.stack);
      }
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
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Internal Server Error' });
        console.log(err.name);
        console.log(err.stack);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  updateUserAvatar,
};
