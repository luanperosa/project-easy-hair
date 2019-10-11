const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const User = require('../../models/User');

const router = express.Router();
const saltRounds = 10;

router.get('/signup', (req, res) => {
  res.render('public/signup');
});

router.post('/signup', async (req, res) => {
  const {
    userName, userEmail, cellphone, password,
  } = req.body;
  if (userName === '' || userEmail === '' || cellphone === '' || password === '') {
    req.flash('error', 'Dados insuficientes, favor preencher todos os campos');
    res.redirect('back');
    // res.render('public/signup', req.body, { errorMessage: 'Dados insuficientes, favor preencher todos os campos' });
    return;
  }

  const user = await User.findOne({ userEmail });
  if (user) {
    req.flash('error', 'Usuário já existente!');
    res.redirect('back');
    // res.render('public/signup', { errorMessage: 'Usuario já existente' });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    userName, userEmail, cellphone, password: hash,
  });

  try {
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('back');
    // res.render('public/signup', { error: 'Erro ao registrar usuario' });
  }
});

router.get('/login', (req, res) => {
  res.render('public/login', { errorMessage: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Você saiu de sua conta');
  res.redirect('/login');
});

module.exports = router;
