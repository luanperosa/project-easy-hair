const express = require('express');
const User = require('../../models/User');
const checkRole = require('../../middlewares/passport-middleware');

const router = express.Router();

const checkOwner = checkRole('Owner');

// /owner
router.get('/', checkOwner, (req, res) => {
  console.log(`This is the OWNER req.user: ${req.user}`);
  res.render('private/owner-list', { req });
});

module.exports = router;