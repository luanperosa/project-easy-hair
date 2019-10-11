const { Schema, model } = require('mongoose');

const newService = new Schema({
  serviceName: { type: String, required: true },
  serviceDuration: { type: Number },
  servicePrice: { type: Number, required: true },
  serviceOrder: { type: Number, default: 0 },
  saloonId: { type: Schema.Types.ObjectId, ref: 'Saloon' },
},
{
  timestamps: true,
});

const Service = model('Service', newService);

module.exports = Service;
