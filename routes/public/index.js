const express = require('express');
const Saloon = require('../../models/Saloon');

const router = express.Router();

router.get('/', (req, res) => {
  // const { currentUser } = req.session;
  // console.log(`Current user ID is: ${currentUser._id}`);
  // console.log(`This is the req.user: ${req.user}`);
  res.render('public/index', { req });
});

module.exports = router;


router.get('/home', async (req, res) => {
  try {
    const listOfSaloon = await Saloon.find({});
    // console.log(`This it the listOfSaloon: ${listOfSaloon}`);
    res.render('public/index', { listOfSaloon });
  } catch (error) {
    throw new Error(error);
  }
});
