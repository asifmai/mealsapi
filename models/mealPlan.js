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
  recipes: [
    {
      type: String,
      items: [
        {
          servings: Number,
          recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe',
          },
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Mealplan", MealPlanSchema);
