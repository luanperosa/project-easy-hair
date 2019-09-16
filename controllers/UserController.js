const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

//Criptografic password
const bcrypt = require('bcrypt');
const saltrounds = 10; 

router.post('/createUser', async (req, res) => {
  const { userName, userEmail, cellphone, password, role } = req.body;
    
  if (!userName || !userEmail || !cellphone || !password || !role) {
    res.status(400).render('public/helloWorld', { err: 'Dados insuficientes, favor preencher todos os campos '} );
  }
  try {
    const userExist = await User.findOne({ userEmail });
    if (userExist) {
      return res.status(400).render('public/helloWorld', { err: 'Usuario já existente'} );  // can't read helloWorld after
    }
    const salt = bcrypt.genSaltSync(saltrounds);
    const hash = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({ userName, userEmail, cellphone, password: hash, role})
    newUser.password = undefined; // empity password after created User on Database
    res.status(201).render('public/helloWorld', { message: `Usuario ${userName} Criado com sucesso` });
  } catch (error) {
    if(error) {
      res.status(500).render('public/helloWorld', { err: `Erro ao registrar usuario`} ); // can't read helloWorld after
    }
  }
}); 

module.exports = router;