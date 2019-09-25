const express = require('express');
const ensureLogin = require('connect-ensure-login');
const checkRole = require('../../middlewares/passport-middleware');
const Saloon = require('../../models/Saloon');
const Service = require('../../models/Service');

const router = express.Router();

const checkOwner = checkRole('Owner');

// /owner

router.get('/', checkOwner, (req, res) => {
  console.log(`This is the OWNER req.user: ${req.user}`);
  const { user } = req;
  res.render('private/owner-profile', user);
});

router.get('/add-saloon', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('private/add-saloon');
});

router.post('/add-saloon', ensureLogin.ensureLoggedIn(), async (req, res) => {
  const userID = req.user._id;
  const {
    saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state,
  } = req.body;
  const newSaloon = new Saloon({
    saloonName, saloonEmail, contactNumber, businessHours, 'address.street': street, 'address.zipcode': zipcode, 'address.city': city, 'address.state': state, userID,
  });
  console.log(`This is the newSaloon: ${newSaloon}`)
  try {
    await newSaloon.save();
    res.redirect('/owner');
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/my-saloon', checkOwner, async (req, res) => {
  const userID = req.user._id;
  console.log(`This is userID: ${userID}`);
  try {
    //  coloquei userID no Saloon manualmente. Pois o campo userID está diferente para cada salão.
    const saloonByOwner = await Saloon.find({ userID });
    // console.log(`this is saloonByOwner variable: ${saloonByOwner}`);
    res.render('private/my-saloon-list', { saloonByOwner });
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/my-saloon/:id', checkOwner, async (req, res) => {
  const { id } = req.params;
  console.log(`This is the is req.params.id: ${id}`)
  try {
    const currentSaloon = await Saloon.findById(id);
    const listOfServices = await Service.find({ 'saloonId': id });
    console.log(`This is the currentSaloon: ${currentSaloon}`);
    res.render('private/my-saloon-page', { currentSaloon, listOfServices });
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/my-saloon/:id/edit', checkOwner, async (req, res) => {
  const { id } = req.params;
  try {
    const saloon = await Saloon.findById(id);
    console.log(`This is the id from saloon edit route ${id}`)
    console.log(`This is the saloon edit route ${saloon}`)
    res.render('private/my-saloon-edit', saloon);
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/my-saloon/:id/edit', checkOwner, async (req, res) => {
  const { id } = req.params;
  const {
    saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state,
  } = req.body;
  // const saloon = {
  //   saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state,
  // }

  if (saloonName === '' || saloonEmail === '' || contactNumber === '') {
    res.render('private/user-edit', { errorMessage: 'Todos os campos devem ser preenchidos' });
    return;
  }

  try {
    await Saloon.findByIdAndUpdate(id, {
      saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state,
    });
    res.redirect('/owner/my-saloon');
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/my-saloon/:id/delete', checkOwner, async (req, res) => {
  const { id } = req.params;
  try {
    await Saloon.findByIdAndRemove(id);
    res.redirect('/owner/my-saloon')
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
