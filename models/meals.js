const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
// Schema Setup
const seatsSchema = new mongoose.Schema({
  recipe_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  mealplan_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  fats: {
    type: String,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("meals", seatsSchema);
