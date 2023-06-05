const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);

router.get('/:user_id', usersController.getUserById);

router.post('/signup', usersController.createUser);

router.post('/signin', usersController.loginUser);

router.patch('/me', usersController.updateUser);

router.patch('/me/avatar', usersController.updateUserAvatar);

module.exports = router;
