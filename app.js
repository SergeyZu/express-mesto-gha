const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

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

// app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('646d6819a72ab810aca5fabb'),
    // _id: '646d6819a72ab810aca5fabb',
  };
  next();
});

// app.use((req, res) => {
//   res.status(404).send({ message: 'Запрашиваемая страница не найдена' });
// });

app.use(router);
