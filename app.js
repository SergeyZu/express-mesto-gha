const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000 ');
});
