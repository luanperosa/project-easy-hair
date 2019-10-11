const express = require('express');
const Service = require('../../models/Service');
const Saloon = require('../../models/Saloon');

const router = express.Router();

router.get('/:saloonID', async (req, res) => {
  const saloonID = req.params.saloonID;
  try {
    const currentSaloon = await Saloon.findById(saloonID);
    const currentService = await Service.find({ saloonId: saloonID });
    console.log(`This is the current Saloon: ${currentSaloon}`);
    res.render('public/saloon-page', { currentSaloon, currentService });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
