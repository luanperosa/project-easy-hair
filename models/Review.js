const { Schema, model } = require('mongoose');

const newReview = new Schema({
  rating: { type: Number, required: true },
  commentary: { type: String },
  saloonID: { type: Schema.Types.ObjectId, ref: 'Saloon' },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Review = model('Review', newReview);

module.exports = Review;
