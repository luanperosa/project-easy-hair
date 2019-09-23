const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // const { currentUser } = req.session;
  // console.log(`Current user ID is: ${currentUser._id}`);
  // console.log(`This is the req.user: ${req.user}`);
  res.render('public/index', { req });
});

module.exports = router;
