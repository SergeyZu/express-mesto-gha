const users = [];
let id = 0;

const getUsers = (req, res) => {
  res.send(users);
};

const getUserById = (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.user_id));

  if (!user) {
    res.status(404).send({ message: 'Пользователь не найден' });
    return;
  }
  res.send(user);
};

const createUser = (req, res) => {
  id += 1;

  console.log(req.body);

  const newUser = {
    ...req.body,
    id,
  };
  users.push(newUser);
  res.send(newUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
