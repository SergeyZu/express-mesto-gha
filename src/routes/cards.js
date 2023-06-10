const router = require('express').Router();
const cardsController = require('../controllers/cards');
const { validateCard } = require('../middlewares/validate');

router.get('/', cardsController.getCards);

router.post('/', validateCard, cardsController.createCard);

router.delete('/:cardId', validateCard, cardsController.deleteCard);

router.put('/:cardId/likes', cardsController.setLike);

router.delete('/:cardId/likes', cardsController.removeLike);

module.exports = router;
