require('dotenv').config();

const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const hbs = require('hbs');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const User = require('./models/User');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log(`Connected to Mongo! Database name: "${con.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  // eslint-disable-next-line consistent-return
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());
passport.use(new LocalStrategy({
  usernameField: 'userEmail',
  passReqToCallback: true,
}, (req, userEmail, password, next) => {
  User.findOne({ userEmail }, (err, user) => {
    if (err) {
      return next(`Esse é o err do LocalStrategy: ${err}`);
    }
    if (!user) {
      req.flash('error', 'Endereço de email incorreto')
      return next(null, false, { errorMessage: 'Endereço de email incorreto.' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      req.flash('error', 'Senha incorreta');
      return next(null, false, { errorMessage: 'Senha incorreta' });
    }
    return next(null, user);
  });
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json()); // recept req.body with json
app.use(bodyParser.urlencoded({ extended: false })); // recept req.body set form type post
app.use(cookieParser());
app.use(session({
  secret: 'basic-auth-secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

hbs.registerHelper('equal', function(valueOne, valueTwo, options) {
  if (arguments.length < 3)
      throw new Error("Handlebars Helper equal needs 2 parameters");
  if( valueOne!=valueTwo ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

hbs.registerHelper('and', function(valueOne, valueTwo, options) {
  if (arguments.length < 3)
      throw new Error("Handlebars Helper equal needs 2 parameters");
  if( valueOne && valueTwo.length > 0 ) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
});

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerPartials(__dirname + '/views/partials');
//  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

const index = require('./routes/public/index');
const authRoutes = require('./routes/public/auth-routes');
const userRoutes = require('./routes/private/user-routes');
const ownerRoutes = require('./routes/private/owner-routes');
const scheduleRoutes = require('./routes/private/schedule-routes');
const servicesRoutes = require('./routes/private/services-routes');
const visitorRouter = require('./routes/public/visitor-routes');

app.use('/', index);
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/owner', ownerRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/services', servicesRoutes);
app.use('/visitor', visitorRouter);

app.listen(process.env.PORT, () => {
  console.log('Server listen', process.env.PORT);
});

module.exports = app;
