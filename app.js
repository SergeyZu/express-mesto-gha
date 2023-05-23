const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [];
let id = 0;

// app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(users);
});

app.post('/', (req, res) => {
  id += 1;

  console.log(req.body);

  const newUser = {
    ...req.body,
    id,
  };
  users.push(newUser);
  res.send(newUser);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000 ');
});
