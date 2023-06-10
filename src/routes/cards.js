const router = require('express').Router();
const cardsController = require('../controllers/cards');
const {
  validateCreateCard,
  validateDeleteCard,
  validateRemoveLike,
} = require('../middlewares/validate');

router.get('/', cardsController.getCards);

router.post('/', validateCreateCard, cardsController.createCard);

router.delete('/:cardId', validateDeleteCard, cardsController.deleteCard);

router.put('/:cardId/likes', cardsController.setLike);

router.delete('/:cardId/likes', validateRemoveLike, cardsController.removeLike);

module.exports = router;
