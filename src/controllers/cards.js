const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const cardModel = require('../models/card');
const {
  OK,
  CREATED,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/status-codes');

const getCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => {
      res.status(OK).send(cards);
      console.log(cards);
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
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

// const getCardOwner = (req, res) => {
//   cardModel
//     .findById(req.params.cardId)
//     .orFail(() => {
//       throw new NotFoundError('Карточка не найдена');
//     })
//     .then((card) => {
//       res.status(OK).send(card);
//       console.log(card.owner);
//       return card.owner;
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         res
//           .status(BAD_REQUEST)
//           .send({ message: 'Введены некорректные данные' });
//         console.log(err);
//       } else if (err instanceof NotFoundError) {
//         res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
//         console.log(err);
//       } else {
//         res
//           .status(INTERNAL_SERVER_ERROR)
//           .send({ message: 'Internal Server Error' });
//         console.log(err);
//       }
//     });
// };

const deleteCard = (req, res) => {
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
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
      } else if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else if (err instanceof ForbiddenError) {
        res
          .status(FORBIDDEN)
          .send({ message: 'Вы не можете удалять чужие карточки' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

// const deleteCard = (req, res) => {
//   const cardOwner = () => getCardOwner();
//   // if (cardOwner !== req.user._id) {
//   //   throw new ForbiddenError('Вы не можете удалять чужие карточки');
//   // }
//   console.log('cardOwner:', cardOwner);
//   console.log('user._id:', req.user._id);

//   cardModel
//     .findByIdAndRemove(req.params.cardId)
//     .orFail(() => {
//       throw new NotFoundError('Карточка не найдена');
//     })
//     .then(() => {
//       // console.log(req.user);
//       // console.log(req);

//       res.send({ message: 'Card deleted' });
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         res
//           .status(BAD_REQUEST)
//           .send({ message: 'Введены некорректные данные' });
//       } else if (err instanceof NotFoundError) {
//         res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
//       } else if (err instanceof ForbiddenError) {
//         res
//           .status(FORBIDDEN)
//           .send({ message: 'Вы не можете удалять чужие карточки' });
//       } else {
//         res.status(INTERNAL_SERVER_ERROR).send({
//           message: 'Internal Server Error',
//           err: err.message,
//           stack: err.stack,
//         });
//       }
//     });
// };

const setLike = (req, res) => {
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
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
      } else if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

const removeLike = (req, res) => {
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
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Введены некорректные данные' });
      } else if (err instanceof NotFoundError) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({
          message: 'Internal Server Error',
          err: err.message,
          stack: err.stack,
        });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  // getCardOwner,
  deleteCard,
  setLike,
  removeLike,
};
