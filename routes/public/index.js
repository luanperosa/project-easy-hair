const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { currentUser } = req.session;
  // console.log(`Current user ID is: ${currentUser._id}`);
  res.render('public/index', currentUser);
});

module.exports = router;
