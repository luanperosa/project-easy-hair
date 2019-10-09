const express = require('express');
const ensureLogin = require('connect-ensure-login');
const checkRole = require('../../middlewares/passport-middleware');
const uploadCloud = require('../../config/cloudinary');
const Saloon = require('../../models/Saloon');
const Service = require('../../models/Service');
const User = require('../../models/User');
const Schedule = require('../../models/Schedule');

const router = express.Router();

const checkOwner = checkRole('Owner');

// /owner

// router.get('/', checkOwner, (req, res) => {
//   console.log(`This is the OWNER req.user: ${req.user}`);
//   const { user } = req;
//   res.render('private/user/owner-profile', user);
// });

router.get('/add-saloon', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('private/saloon/add-saloon');
});

// router.post('/add-saloon', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), async (req, res) => {
//   const userID = req.user._id;
//   const {
//     saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state,
//   } = req.body;
//   const imageName = req.file.originalname;
//   const imagePath = req.file.url;
//   const newSaloon = new Saloon({
//     saloonName, saloonEmail, contactNumber, businessHours, 'address.street': street, 'address.zipcode': zipcode, 'address.city': city, 'address.state': state, imageName, imagePath, userID,
//   });
//   if (req.user.role === 'Customer') {
//     await User.findByIdAndUpdate(userID, { role: 'Owner' });
//   }
//   console.log(`This is the newSaloon: ${newSaloon}`)
//   try {
//     await newSaloon.save();
//     res.redirect('/owner/my-saloon');
//   } catch (error) {
//     throw new Error(error);
//   }
// });

router.post('/add-saloon', ensureLogin.ensureLoggedIn(), uploadCloud.single('photo'), async (req, res) => {
  const userID = req.user._id;
  let {
    saloonName, saloonEmail, fullAddress, saloonPosition, contactNumber, businessHours, imageGallery, instagramProfile, placeID, reviewsFromGoogle, reviewsFromGoogleText, ratingFromGoogle,
  } = req.body;
  const imageName = req.file.originalname;
  const imagePath = req.file.url;

  const reviewArray = [];
  reviewsFromGoogle.forEach((review, index) => {
    let reviewString = review.replace(/\*/g, '"');
    reviewString = JSON.parse(reviewString.toString());
    reviewString.text = reviewsFromGoogleText[index];
    reviewArray.push(reviewString);
  });

  // eslint-disable-next-line no-const-assign
  reviewsFromGoogle = reviewArray;

  console.log(`imageGallery: ${imageGallery}
    ratingFromGoogle: ${ratingFromGoogle}
    reviewsFromGoogle: ${reviewsFromGoogle}
    saloonPosition: ${saloonPosition}
    `);

    // const checkSaloonPlaceID = Saloon.find({ placeID });

    // if (checkSaloonPlaceID) {
    //   req.flash('error', 'Este salão já está cadastrado');
    //   console.log(`this is the placeID ${placeID}`);
    //   res.redirect('back');
    //   return;
    // }  

  const newSaloon = new Saloon({
    saloonName, saloonEmail, fullAddress, saloonPosition, contactNumber, businessHours, imageGallery, instagramProfile, placeID, reviewsFromGoogle, ratingFromGoogle, imageName, imagePath, userID,
  });


  if (req.user.role === 'Customer') {
    await User.findByIdAndUpdate(userID, { role: 'Owner' });
  }
  console.log(`This is the newSaloon: ${newSaloon}`);
  try {
    await newSaloon.save();
    res.redirect('/owner/my-saloon');
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
    res.render('private/saloon/my-saloon-list', { saloonByOwner });
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
    // console.log(`This is the currentSaloon: ${currentSaloon}`);
    res.render('private/saloon/my-saloon-page', { currentSaloon, listOfServices });
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/my-saloon/:id/edit', checkOwner, async (req, res) => {
  const { id } = req.params;
  try {
    const saloon = await Saloon.findById(id);
    console.log(`This is the id from saloon edit route ${id}`);
    console.log(`This is the saloon edit route ${saloon}`);
    res.render('private/saloon/my-saloon-edit', saloon);
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/my-saloon/:id/edit', checkOwner, uploadCloud.single('photo'), async (req, res) => {
  const { id } = req.params;
  const {
    saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state,
  } = req.body;
  const imageName = req.file.originalname;
  const imagePath = req.file.url;

  if (saloonName === '' || saloonEmail === '' || contactNumber === '') {
    res.render('private/user/user-edit', { errorMessage: 'Todos os campos devem ser preenchidos' });
    return;
  }

  try {
    await Saloon.findByIdAndUpdate(id, {
      saloonName, saloonEmail, contactNumber, businessHours, street, zipcode, city, state, imageName, imagePath,
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

router.get('/my-saloon/:id/schedule', checkOwner, async (req, res) => {
  const currentSaloon = await Saloon.findById(req.params.id);
  try {
    // const scheduleUser = await Schedule.find({ userID });
    const scheduleSaloon = await Schedule.find({ 'saloonID': req.params.id });
    let currentObject = [{
      date: String,
      service: String,
      sallon: String,
    }];
    let arrayObject = [];
    for (let i = 0; i < scheduleSaloon.length; i += 1) {
      let serv =  await Service.findById(scheduleSaloon[i].serviceID);
      let customer = await User.findById(scheduleSaloon[i].userID);

      currentObject = new Object({
        date: scheduleSaloon[i].dateOfService,
        service: serv.serviceName,
        customer: customer.userName,
      });
      arrayObject.push(currentObject);
    }
    // res.render('private/my-schedule', { arrayObject });
    res.render('private/saloon/my-saloon-schedule', { arrayObject, currentSaloon });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
