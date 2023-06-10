const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  validateCreateUser,
  validateUserId,
  validateUpdateUserAvatar,
} = require('../middlewares/validate');

router.get('/', usersController.getUsers);

router.get('/me', validateUserId, usersController.getUserData);

router.get('/:user_id', validateUserId, usersController.getUserById);

router.patch('/me', validateCreateUser, usersController.updateUser);

router.patch(
  '/me/avatar',
  validateUpdateUserAvatar,
  usersController.updateUserAvatar
);

module.exports = router;
