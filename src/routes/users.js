const router = require('express').Router();
const usersController = require('../controllers/users');
const { validateGetUserData } = require('../middlewares/validate');

router.get('/', usersController.getUsers);

router.get('/me', validateGetUserData, usersController.getUserData);

router.get('/:user_id', usersController.getUserById);

router.patch('/me', usersController.updateUser);

router.patch('/me/avatar', usersController.updateUserAvatar);

module.exports = router;
