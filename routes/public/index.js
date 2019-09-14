const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('public/index', { message: 'Test Route index' } );
});

module.exports = router;