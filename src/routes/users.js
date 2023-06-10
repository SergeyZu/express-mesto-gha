const router = require('express').Router();
const usersController = require('../controllers/users');
const { validateUser } = require('../middlewares/validate');

router.get('/', usersController.getUsers);

router.get('/me', usersController.getUserData);

router.get('/:user_id', usersController.getUserById);

router.patch('/me', usersController.updateUser);

router.patch('/me/avatar', validateUser, usersController.updateUserAvatar);

module.exports = router;
