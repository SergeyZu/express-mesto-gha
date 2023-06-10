// const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const cardModel = require('../models/card');
const {
  OK,
  CREATED,
  // BAD_REQUEST,
  // FORBIDDEN,
  // NOT_FOUND,
  // INTERNAL_SERVER_ERROR,
} = require('../utils/status-codes');

const getCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => {
      res.status(OK).send(cards);
      console.log(cards);
    })
    .catch(next);
  // .catch((err) => {
  //   res.status(INTERNAL_SERVER_ERROR).send({
  //     message: 'Internal Server Error',
  //     err: err.message,
  //     stack: err.stack,
  //   });
  // });
};

const createCard = (req, res, next) => {
  cardModel
    .create({ owner: req.user._id, ...req.body })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err.name === 'ValidationError') {
  //     res
  //       .status(BAD_REQUEST)
  //       .send({ message: 'Переданы некорректные данные' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send({
  //       message: 'Internal Server Error',
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   }
  // });
};

const deleteCard = (req, res, next) => {
  cardModel
    .findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      return cardModel
        .deleteOne()
        .then(() => res.status(OK).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res
  //       .status(BAD_REQUEST)
  //       .send({ message: 'Введены некорректные данные' });
  //   } else if (err instanceof NotFoundError) {
  //     res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
  //   } else if (err instanceof ForbiddenError) {
  //     res
  //       .status(FORBIDDEN)
  //       .send({ message: 'Вы не можете удалять чужие карточки' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send({
  //       message: 'Internal Server Error',
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   }
  // });
};

const setLike = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res
  //       .status(BAD_REQUEST)
  //       .send({ message: 'Введены некорректные данные' });
  //   } else if (err instanceof NotFoundError) {
  //     res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send({
  //       message: 'Internal Server Error',
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   }
  // });
};

const removeLike = (req, res, next) => {
  cardModel
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.CastError) {
  //     res
  //       .status(BAD_REQUEST)
  //       .send({ message: 'Введены некорректные данные' });
  //   } else if (err instanceof NotFoundError) {
  //     res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send({
  //       message: 'Internal Server Error',
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   }
  // });
};

module.exports = {
  getCards,
  createCard,
  // getCardOwner,
  deleteCard,
  setLike,
  removeLike,
};
