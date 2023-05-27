const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const cardModel = require('../models/card');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/status-codes');

const getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => {
      res.status(OK).send(cards);
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const createCard = (req, res) => {
  cardModel
    .create({
      owner: req.user._id,
      ...req.body,
    })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const deleteCard = (req, res) => {
  // console.log(req.params);
  cardModel
    .findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then(() => {
      res.send({ message: 'Card deleted' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
        return;
      }
      if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const setLike = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const removeLike = (req, res) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
        return;
      }
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
};
