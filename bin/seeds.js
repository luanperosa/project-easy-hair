require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');

console.log(process.env.MONGODB_URI); // return undefined
//mongoose.connect(mongoDbAtlas, { useNewUrlParser: true }) // process.env.MONGODB_URI fail, needed use the __dirname complet to Database to add User

const dataDate = new Date('01:00');
console.log(dataDate);


// const newSchedule = {
//   dateOfService: { '29-12-2019' },
//   timeOfService: { new Date('') },
// };

// User.create(newUser, (err) => {
//   if(err) {
//     throw new Error(err);
//   }
//   console.log(`Created User ${newUser.userName} with sucess!`);
//   mongoose.connection.close();
// });
