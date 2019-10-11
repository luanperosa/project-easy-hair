const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ensureLogin = require('connect-ensure-login');
const User = require('../../models/User');

// user with bcript
const saltRounds = 10;


// user
router.get('/profile', ensureLogin.ensureLoggedIn(), async (req, res) => {
  // const { currentUser } = req.session;
  // console.log(`rota privada usuário logado ${currentUser.userName}`);
  // console.log(`This is the req.user in GET /profile: ${req.user}`);
  res.render('private/user-profile', req.user);
});

router.get('/:id/edit', ensureLogin.ensureLoggedIn(), async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render('private/user/user-edit', user);
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/:id/edit', ensureLogin.ensureLoggedIn(), async (req, res) => {
  const { id } = req.params;
  const { userName, userEmail, cellphone } = req.body;
  const user = {
    userName, userEmail, cellphone, id,
  };

  if (userName === '' || userEmail === '' || cellphone === '') {
    res.render('private/user/user-edit', { user, errorMessage: 'Todos os campos devem ser preenchidos' });
    return;
  }

  try {
    await User.findByIdAndUpdate(id, { userName, userEmail, cellphone });
    res.redirect('/user/profile');
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/:id/delete', ensureLogin.ensureLoggedIn(), async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id);
    req.flash('success', 'Usuário deletado com sucesso');
    res.redirect('/home');
    // req.logout();
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/edit-password', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('private/user/user-edit-password', req.user);
  // eslint-disable-next-line no-console
  console.log(`This is the req.user in GET /edit-password: ${req.user}`);
});

router.post('/edit-password/:id', ensureLogin.ensureLoggedIn(), async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const { passwordConfirmation } = req.body;

  if (password === '' || passwordConfirmation === '') {
    res.render('private/user/user-edit-password', { errorMessage: 'É necessário preencher os dois campos' });
    return;
  }
  if (password !== passwordConfirmation) {
    res.render('private/user/user-edit-password', { errorMessage: 'A senha de confirmação não é a mesma que a nova senha' });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  try {
    await User.findByIdAndUpdate(id, { password: hash });
    res.redirect(`/user/${id}/edit`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
});

module.exports = router;
