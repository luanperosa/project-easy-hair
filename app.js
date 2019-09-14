require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User'); // just test, after empity
const app = express();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((con) => {
    console.log(`Connected to Mongo! Database name: "${con.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json()); // recept req.body with json
app.use(bodyParser.urlencoded({ extended: false })); // recept req.body set form type post

app.get('/test', (req, res) => {
  res.render('public/helloWorld', { title: 'Hello World' });
});

// routes 
const index = require('./routes/public/index');
app.use('/', index);

const UserController = require('./controllers/UserController');
app.use('/', UserController);

app.listen(process.env.PORT, () => {
  console.log('Server linten', process.env.PORT);
});