const router = require('express').Router();
const cardsController = require('../controllers/cards');

router.get('/', cardsController.getCards);

router.post('/', cardsController.createCard);

router.delete('/:cardId', cardsController.deleteCard);

router.put('/:cardId/likes', cardsController.setLike);

router.delete('/:cardId/likes', cardsController.removeLike);

module.exports = router;
