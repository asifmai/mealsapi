const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  Userid: String,
  weightKg: Number,
  heightFt: String,
  age: Number,
  gender: String,
  activityLevel: String,
  maintainCalories: Number,
  lowCalories: Number,
  meal1Fat: Number,
  meal1Proteins: Number,
  meal1Carbs: Number,
  meal2Fat: Number,
  meal2Proteins: Number,
  meal2Carbs: Number,
  meal3Fat: Number,
  meal3Proteins: Number,
  meal3Carbs: Number,
});

module.exports = mongoose.model("Members", planSchema);
