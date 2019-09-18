const { Schema, model } = require('mongoose');

const newSchedule = new Schema({
  dateOfService: { type: Date, required: true },
  timeOfService: { type: Date, required: true },
  // saloonID: { type: Schema.Types.ObjectId, ref: 'Saloon' },
  // userID: { type: Schema.Types.ObjectId, ref: 'User' },
  // serviceID: { type: Schema.Types.ObjectId, ref: 'Service' },
},
{
  timestamps: true,
});

const Schedule = model('Schedule', newSchedule);

module.exports = Schedule;
