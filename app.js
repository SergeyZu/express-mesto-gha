const express = require('express');
const mongoose = require('mongoose');
const router = require('./src/routes');
// const { auth } = require('./src/middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Успешное подключение к базе данных');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Ошибка подключения к базе данных ${err.name}`);
  });

app.use(express.json());

// app.use(auth);

app.use(router);
