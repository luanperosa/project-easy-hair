const { Schema, model } = require('mongoose');

const newSaloon = new Schema({
  saloonName: { type: String, required: true },
  saloonEmail: { type: String, required: false },
  address: {
    street: { type: String, required: false },
    zipcode: { type: String, require: false },
    city: { type: String, require: false },
    state: { type: String, require: false },
    country: { type: String, default: 'Brazil' },
  },
  fullAddress: { type: String }, /* NEW */
  saloonPosition: { type: Array }, /* NEW */
  contactNumber: { type: String, required: true },
  businessHours: { type: String, required: true },
  imageName: { type: String, required: false },
  imagePath: { type: String, required: false },
  imageGallery: { type: Array }, /* NEW */
  instagramProfile: { type: String },
  placeID: { type: String }, /* NEW */
  reviewsFromGoogle: { type: Array }, /* NEW */
  ratingFromGoogle: { type: Number }, /* NEW */
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: true,
});

const Saloon = model('Saloon', newSaloon);

module.exports = Saloon;
