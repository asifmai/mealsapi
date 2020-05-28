const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  recepies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Link with Recepie

module.exports = mongoose.model("Mealplan", MealPlanSchema);
