const express = require('express');
const date = require('date-and-time');
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const Schedule = require('../../models/Schedule');
const Service = require('../../models/Service');
const Saloon = require('../../models/Saloon');

router.get('/:saloonID/:serviceID/create-schedule', ensureLogin.ensureLoggedIn(), (req, res) => {
  const currentSaloon = req.params.saloonID;
  const currentService = req.params.serviceID;
  res.render('private/confirm-schedule', { currentSaloon, currentService });
});


router.post('/:saloonID/:serviceID/create-schedule', async (req, res) => {
  const userID = req.user._id;
  const scheduleBody = req.body;
  const { saloonID, serviceID } = req.params;
  
  const { dateOfService, timeOfService, } = scheduleBody;
  const dateService = date.parse(dateOfService, 'YYYY/MM/DD HH:mm:ss')
  
  const fullDate = new Date(`${dateOfService} ${timeOfService}`);
  
  console.log('userID ', userID)
  console.log('saloonID, serviceID ', saloonID, serviceID)
  
  if(!scheduleBody) {
    res.render('private/confirm-schedules', { errorMessage: 'Dados insuficientes, preencher todos os dados'});
  }
  
  try {
    const newSchedule = await Schedule.create({ dateOfService: fullDate, saloonID, userID, serviceID });
    // res.render('private/confirm-schedule', { message: `Agendamento criado com sucesso <br /> ${newSchedule}` });
    req.flash('success', 'Agendamento criado com sucesso');
    res.redirect('/user/profile');
  } catch (error) {
    throw new Error(error)
  }
});


router.get('/my-schedule', async (req, res) => {
  const userID = req.user._id;

  if (!userID) {
    res.render('private/my-schedule', { errorMessage: `Usuario ${userID} inexistente` });
  }

  try {
    const scheduleUser = await Schedule.find({ userID });
    let currentObject = [{
      date: String,
      service: String,
      saloon: String,
    }];
    let arrayObject = [];
    for (let i = 0; i < scheduleUser.length; i += 1) {
      let serv =  await Service.findById(scheduleUser[i].serviceID);
      let sal = await Saloon.findById(scheduleUser[i].saloonID);

      currentObject = new Object({
        date: scheduleUser[i].dateOfService,
        service: serv.serviceName,
        saloon: sal.saloonName,
        saloonID: sal._id,
      });
      arrayObject.push(currentObject);
    }

    let currentDate = [];
    arrayObject.forEach((element) => {
      let hour = element.date.getHours();
      let date = element.date.getDate();
      let mounth = 1 + element.date.getMonth();
      let year = element.date.getFullYear(); 
      let service = element.service;
      let saloon = element.saloon;
      let saloonID = element.saloonID;

      currentDateObject = new Object({
        hour,
        date,
        mounth,
        year,
        service,
        saloon,
        saloonID
      })
      currentDate.push(currentDateObject)
    })
    
    res.render('private/my-schedule', { currentDate });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
