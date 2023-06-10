const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  validateCreateUser,
  validateUserId,
} = require('../middlewares/validate');

router.get('/', validateUserId, usersController.getUsers);

router.get('/me', validateUserId, usersController.getUserData);

router.get('/:user_id', usersController.getUserById);

router.patch('/me', validateCreateUser, usersController.updateUser);

router.patch('/me/avatar', usersController.updateUserAvatar);

module.exports = router;
