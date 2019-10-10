const { Schema, model } = require('mongoose');

const newSaloon = new Schema({
  saloonName: { type: String, required: true },
  saloonEmail: { type: String, required: false },
  fullAddress: { type: String }, /* NEW */
  saloonPosition: { type: Array }, /* NEW */
  contactNumber: { type: String, required: false },
  businessHours: { type: String, required: false },
  imageName: { type: String, required: false },
  imagePath: { type: String, required: false },
  imageGallery: { type: Array }, /* NEW */
  instagramProfile: { type: String, require: false },
  placeID: { type: String }, /* NEW */
  reviewsFromGoogle: { type: Array }, /* NEW */
  ratingFromGoogle: { type: Number, default: 0 }, /* NEW */
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
},
{
  timestamps: true,
});

const Saloon = model('Saloon', newSaloon);

module.exports = Saloon;
