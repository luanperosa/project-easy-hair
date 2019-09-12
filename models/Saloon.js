const { Schema, model } = require('mongoose');

const newSaloon = new Schema({
  salonName: { type: String, required: true },
  adress: { 
    street: { type: String, required: true },
    zipcode: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true},
    country: { type: String, default: 'Brazil' },
  },
  phoneNumber: { type: Number, required: true},
  businesHour: { type: String, required: true},
  imageSlideShow: { type: String, required: true },
  imageGalery: [ { linkImage: String, nameImage: String } ],
  linkInstagran: String,
  services: { type: Schema.Types.ObjectId, ref: 'Service' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  coments: String,
  reviews: String,
},
{
  timestamps: true,
});

const Saloon = model('Saloon', newSaloon);

module.exports = Salon;