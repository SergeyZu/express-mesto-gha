const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
// const cardsRouter = require('./routes/cards');

const app = express();

// app.use(express.json());
app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000 ');
});
