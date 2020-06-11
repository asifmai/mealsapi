const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  age: Number,
  activityLevel: String,
  noOfMeals: Number,
  calories: Number,
  carbs: Number,
  fats: Number,
  proteins: Number,
  bread: Boolean,
  dessert: Boolean,
  prefferedMeals: [{type: String}],
})

module.exports = mongoose.model('Profile', ProfileSchema);