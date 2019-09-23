const { Schema, model } = require('mongoose');

const newSaloon = new Schema({
  saloonName: { type: String, required: true },
  saloonEmail: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    zipcode: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, default: 'Brazil' },
  },
  contactNumber: { type: Number, required: true },
  businessHours: { type: String, required: true },
  imageSlideShow: { type: String, required: true },
  imageGalery: [{ linkImage: String, nameImage: String }],
  linkInstagran: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: true,
});

const Saloon = model('Saloon', newSaloon);

module.exports = Saloon;
