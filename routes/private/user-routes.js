const express = require('express');
const User = require('../../models/User');

const router = express.Router();

// user/
router.get('/profile', async (req, res) => {
  const { currentUser } = req.session;
  // console.log(`rota privada usuário logado ${currentUser.userName}`);
  res.render('private/user-profile', currentUser);
})

router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render('private/user-edit', user);
  } catch (err) {
    throw new Error(err);
  };
});

router.post('/:id/edit', async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    await User.findByIdAndUpdate(id, user);
    res.redirect('/user/:id/edit');
    console.log('Editado com sucesso!');
  } catch (error) {
    console.log(error);
  }

})

module.exports = router;
