const express = require('express');
const checkRole = require('../../middlewares/passport-middleware');
const User = require('../../models/User');
const Service = require('../../models/Service');
const Saloon = require('../../models/Saloon');

const router = express.Router();

const checkOwner = checkRole('Owner');

//  apos testes, implementar o ckeckOwner em todas rotas

router.get('/:saloonId/add', async (req, res) => {
  const currentSaloon = req.params.saloonId;
  res.render('private/services/add-service', { currentSaloon });
});

router.post('/:saloonId/add', async (req, res) => {
  const {
    serviceName, serviceDuration, servicePrice, serviceOrder,
  } = req.body;
  const { saloonId } = req.params;
  console.log(`this is the req.params2: ${req.params.saloonId}`);
  if (!serviceName || !serviceDuration || !servicePrice || !serviceOrder ) {
    res.render('private/sallon-services', { errorMessage: 'Todos os campos devem ser preenchidos' });
  }

  try {
    const newService = await Service.create({ 
      serviceName, serviceDuration, servicePrice, serviceOrder, saloonId,
    });
    res.redirect(`/owner/my-saloon/${newService.saloonId}`);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
