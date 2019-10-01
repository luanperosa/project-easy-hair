require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Sallon = require('../models/Saloon');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }) // process.env.MONGODB_URI fail, needed use the __dirname complet to Database to add User

const newSallon = new Sallon({
  saloonName: 'Vintage',
  saloonEmail: 'vintage@gmail.com',
  address: {
    street: 'Alameda Jaú',
    zipcode: '03589000',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brazil'
  },
  contactNumber: 33444443,
  businessHours: '33',
  imageSlideShow: 'https://avatars0.githubusercontent.com/u/50602816?v=4',
  userID: '5d80292d351fe911b5d3b917'
})


User.findById('5d7eebf8950a7d0ff79208e6')
  .then(resposta => {
    console.log(resposta.createdAt.getHours())
    console.log(resposta.createdAt.getTime())
    console.log(resposta.createdAt.getDate())
  })

