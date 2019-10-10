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
  if (!serviceName || !serviceDuration || !servicePrice) {
    req.flash('error', 'Todos os campos devem ser preenchidos');
    return res.redirect('back');
  }

  try {
    const newService = await Service.create({ 
      serviceName, serviceDuration, servicePrice, serviceOrder, saloonId,
    });
    req.flash('success', 'Serviço adicionado com sucesso');
    res.redirect(`/owner/my-saloon/${newService.saloonId}`);
  } catch (error) {
    throw new Error(error);
  }
});

router.get('/:id/edit', async (req, res) => {
  const serviceId = req.params.id;
  try {
    const currentService = await Service.findById(serviceId);
    res.render('private/services/edit-service', { currentService });
    console.log(`currentService is ${currentService}`);
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/:id', async (req, res) => {
  const {
    serviceName, serviceDuration, servicePrice, serviceOrder,
  } = req.body;
  const currentId = req.params.id;
  try {
    const newService = await Service.findByIdAndUpdate(currentId, {
      serviceName, serviceDuration, servicePrice, serviceOrder,
    });
    console.log(`This is the new Service: ${newService}`);
    res.redirect(`/owner/my-saloon/${newService.saloonId}`);
    
  } catch (error) {
    throw new Error(error);
  }
});

router.post('/:id/delete', checkOwner, async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id)
  try {
    await Service.findByIdAndRemove(id);
    req.flash('success', 'Serviço deletado com sucesso');
    res.redirect(`/owner/my-saloon/${service.saloonId}`);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
