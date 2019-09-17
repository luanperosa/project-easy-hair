const express = require('express');
const bcrypt = require('bcrypt');
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
    res.status(400).render('public/signup', { errorMessage: 'Dados insuficientes, favor preencher todos os campos' });
    return;
  }

  const userExist = await User.findOne({ userEmail });
  if (userExist) {
    res.status(400).render('public/signup', { errorMessage: 'Usuario já existente' });
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
    res.status(500).render('public/signup', { error: 'Erro ao registrar usuario' });
  }
});

router.get('/login', (req, res) => {
  res.render('public/login');
});

router.post('/login', async (req, res, next) => {
  const { userEmail, password } = req.body;
  if (userEmail === '' || password === '') {
    res.render('public/login', {
      errorMessage: 'Por favor, preencha o email e senha para entrar',
    });
    return;
  }

  const user = await User.findOne({ userEmail });

  if (!user) {
    res.render('public/login', { errorMessage: 'Este usuário não existe' });
    return;
  }

  if (bcrypt.compareSync(password, user.password)) {
    req.session.currentUser = user;
    console.log(`Usuário logado ${user}`);
    res.status(201).redirect('/');
  } else {
    res.render('public/login', { errorMessage: 'Senha incorreta' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
});

module.exports = router;