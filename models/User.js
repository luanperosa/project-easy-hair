const { Schema, model } = require('mongoose');

const newUser = new Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  cellphone: { type: Number },
  password: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Owner'], default: 'Customer' },

}, { timestamps: true });

const User = model('User', newUser);

module.exports = User;
