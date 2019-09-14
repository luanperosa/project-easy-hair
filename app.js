require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

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

app.use(express.json()) // req and res with json, maibe we use to future

app.get('/test', (req, res) => {
  res.render('public/helloWorld', { message: 'Hello World' });
});

app.get('/test', (req, res) => {
  console.log(req.body); // check why req.body not read
});

// routes 
const index = require('./routes/public/index');
app.use('/', index);

const UserController = require('./controllers/UserController');
app.use('/createSallon', UserController);

app.listen(process.env.PORT, () => {
  console.log('Server linten', process.env.PORT);
});