const express = require('express');
const router = express.Router();
const Schedule = require('../../models/Schedule');

router.get('/confirm', (req, res) => {
  const { currentUser } = req.session;
  res.render('private/confirm-schedule');
})

router.post('/:id/create-schedule', async (req, res) => {
  //dateOfService, timeOfService, saloonID, userID, serviceID
  console.log('req ponto body: ', req.body);
  const scheduleBody = req.body;
  const { dateOfService, timeOfService, saloonID, userID, serviceID } = scheduleBody;
  // if(!scheduleBody) {
  //   res.render('private/confirm-schedules', { errorMessage: 'Dados insuficientes, preencher todos os dados'});
  // }
  try {
    const newSchedule = await Schedule.create({ dateOfService, timeOfService });
    res.render('private/confirm-schedule', { message: `Agendamento criado com sucesso <br /> ${newSchedule}` });
  } catch (error) {
    throw new Error(error);
    res.render('private/confirm-schedule', { server: `${error}` });
  }
});

module.exports = router;