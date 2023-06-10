const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND } = require('../utils/status-codes');
const usersController = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateUser } = require('../middlewares/validate');

router.post('/signup', validateUser, usersController.createUser);
router.post('/signin', usersController.loginUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Not found' });
});

module.exports = router;
