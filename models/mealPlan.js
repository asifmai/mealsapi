const mongoose = require("mongoose");

const MealPlanSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  recipes: [
    {
      recipeType: String,
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
