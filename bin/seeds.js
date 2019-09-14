require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');

console.log(process.env.MONGODB_URI); // return undefined
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) // process.env.MONGODB_URI fail, needed use the __dirname complet to Database to add User

const newUser = {
  userName: 'Luan Perosa Chitto',
  userEmail: 'luan.perosa@hotmail.com',
  cellphone: '98072564',
  password: '123456',
  // role: 'Owner',
};

User.create(newUser, (err) => {
  if(err) {
    throw new Error(err);
  }
  console.log(`Created User ${newUser.userName} with sucess!`);
  mongoose.connection.close();
});
