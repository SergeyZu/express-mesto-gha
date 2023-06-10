const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const usersController = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const {
  validateCreateUser,
  validateLoginUser,
} = require('../middlewares/validate');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateCreateUser, usersController.createUser);
router.post('/signin', validateLoginUser, usersController.loginUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
