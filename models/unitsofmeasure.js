const mongoose = require('mongoose');

const UnitsofMeasureSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Unitsofmeasure', UnitsofMeasureSchema);