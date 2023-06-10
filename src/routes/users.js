const router = require('express').Router();
const usersController = require('../controllers/users');
const { validateUserId } = require('../middlewares/validate');

router.get('/', usersController.getUsers);

router.get('/me', validateUserId, usersController.getUserData);

router.get('/:user_id', usersController.getUserById);

router.patch('/me', usersController.updateUser);

router.patch('/me/avatar', usersController.updateUserAvatar);

module.exports = router;
