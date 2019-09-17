require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then((con) => {
    console.log(`Connected to Mongo! Database name: "${con.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json()); // recept req.body with json
app.use(bodyParser.urlencoded({ extended: false })); // recept req.body set form type post
app.use(cookieParser());

app.use(session({
  secret: 'basic-auth-secret',
  cookie: { maxAge: 60000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
}));
/*
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true,
}));
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

const index = require('./routes/public/index');
const authRoutes = require('./routes/public/auth-routes');
const userRoutes = require('./routes/private/user-routes');

app.use('/', index);
app.use('/', authRoutes);

// Protected Routes Middleware
app.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
});

app.use('/user', userRoutes);

/*
app.get('/test', (req, res) => {
  res.render('public/helloWorld', { title: 'Hello World' });
});

// routes
const index = require('./routes/public/index');
app.use('/', index);

const UserController = require('./controllers/UserController');
app.use('/', UserController);
*/

app.listen(process.env.PORT, () => {
  console.log('Server linten', process.env.PORT);
});
