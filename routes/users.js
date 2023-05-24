const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:user_id', getUserById);

router.post('/', createUser);

module.exports = router;