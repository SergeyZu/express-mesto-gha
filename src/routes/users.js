const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);

router.get('/me', usersController.getUserData);

router.get('/:user_id', usersController.getUserById);

router.patch('/me', usersController.updateUser);

router.patch('/me/avatar', usersController.updateUserAvatar);

module.exports = router;
