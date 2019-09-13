require('dotenv').config();

const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/test', (req, res) => {
  res.render('index', { message: 'First test' });
})

app.listen(process.env.PORT, () => {
  console.log('Server linten', process.env.PORT);
})