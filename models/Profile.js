const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  height: String,
  weight: String,
  age: Number,
  activityLevel: String,
  noOfMeals: Number,
  calories: String,
  carbs: String,
  fats: String,
  proteins: String,
})

module.exports = mongoose.model('Profile', ProfileSchema);