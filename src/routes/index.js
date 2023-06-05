const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND } = require('../utils/status-codes');
const usersController = require('../controllers/users');

router.post('/signup', usersController.createUser);
router.post('/signin', usersController.loginUser);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Not found' });
});

module.exports = router;
