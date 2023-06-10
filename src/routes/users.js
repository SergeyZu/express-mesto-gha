const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  validateUpdateUser,
  validateUserId,
  validateUpdateUserAvatar,
} = require('../middlewares/validate');

router.get('/', usersController.getUsers);

router.get('/me', validateUserId, usersController.getUserData);

router.get('/:user_id', validateUserId, usersController.getUserById);

router.patch('/me', validateUpdateUser, usersController.updateUser);

router.patch(
  '/me/avatar',
  validateUpdateUserAvatar,
  usersController.updateUserAvatar
);

module.exports = router;
