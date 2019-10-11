const express = require('express');
const Saloon = require('../../models/Saloon');

const router = express.Router();

router.get('/', (req, res) => {
  // const { currentUser } = req.session;
  // console.log(`Current user ID is: ${currentUser._id}`);
  // console.log(`This is the req.user: ${req.user}`);
  // res.render('public/index', { req });
  res.redirect('/home');
});

module.exports = router;


router.get('/home', async (req, res) => {
  try {
    const listOfSaloon = await Saloon.find({});
    // const listOfSaloonSorted = await Saloon.find({}).sort({ ratingFromGoogle: -1 });
    // console.log('listOfSaloonSorted', listOfSaloonSorted);
    res.render('public/index', { listOfSaloon });
    // console.log(`This is the req.user: ${req.user}`);
  } catch (error) {
    throw new Error(error);
  }
});
