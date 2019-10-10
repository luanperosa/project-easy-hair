const express = require('express');
const Saloon = require('../../models/Saloon');

const router = express.Router();

/* GET home page */
router.get('/saloon', async (req, res, next) => {
  const { value } = req.query;
  const filteredSaloon = await Saloon.find({}).sort({ ratingFromGoogle: -1 });
  res.status(200).json(filteredSaloon);
});

module.exports = router;
