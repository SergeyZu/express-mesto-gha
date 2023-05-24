const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

// app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('646d6819a72ab810aca5fabb'),
    // _id: '646d6819a72ab810aca5fabb',
  };
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
