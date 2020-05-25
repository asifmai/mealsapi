const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// Schema Setup
const recepiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  netcarbs: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  diet: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("recipes", recepiesSchema);
