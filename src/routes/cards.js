const router = require('express').Router();
const cardsController = require('../controllers/cards');
const {
  validateCreateCard,
  validateСardId,
} = require('../middlewares/validate');

router.get('/', cardsController.getCards);

router.post('/', validateCreateCard, cardsController.createCard);

router.delete('/:cardId', validateСardId, cardsController.deleteCard);

router.put('/:cardId/likes', validateСardId, cardsController.setLike);

router.delete('/:cardId/likes', validateСardId, cardsController.removeLike);

module.exports = router;
