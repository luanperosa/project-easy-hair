const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const newUser = req.body;
  console.log(newUser)
  try {
    const userExist = await User.findById(newUser._id);
    if(userExist) {
      res.render('public/login', { message: 'Este usuário já existe' });
    }
    const createdUser = await User.create({newUser});
    res.render('public/login', { message: `Usuario ${createdUser} criado com sucesso` });

  } catch (error) {
    if(error) {
    throw new Error(error);
    }
  }
});

module.exports = router;