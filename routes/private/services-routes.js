const express = require('express');
const User = require('../../models/User');
const checkRole = require('../../middlewares/passport-middleware');
const Service = require('../../models/Service');
const Sallon = require('../../models/Saloon');

const router = express.Router();

const checkOwner = checkRole('Owner');

//apos testes, implementar o ckeckOwner em todas rotas

router.get('/:saloonId', async (req, res) => {
  const { saloonId } = req.params;

  const services = await Service.find({saloonId})
  
  if(services) {
  res.render('private/sallon-services', { services })  
  }
  
  res.render('private/sallon-services')
});

router.post('/:saloonId/create', async (req, res) => {
  const { serviceName, serviceDuration, servicePrice, serviceOrder } = req.body; 
  const { saloonId } = req.params;
  
  if(!serviceName || !serviceDuration || !servicePrice || !serviceOrder ) {
    res.render('private/sallon-services', { errorMessage: 'Todos os campos devem ser preenchidos' });
  }

  try {
    const newService = await Service.create({serviceName, serviceDuration, servicePrice, serviceOrder, saloonId})
    res.render('private/sallon-services', { message: `Serviço ${serviceName} criado com sucesso!`});
    
    }
  catch (error) {
    throw new Error(error);
  }

})

module.exports = router;