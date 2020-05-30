const mongoose = require("mongoose");

// Schema Setup
const RecipeingredientSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
  },
  unitOfMeasure: String,
  amount: Number,
});

module.exports = mongoose.model("Recipeingredient", RecipeingredientSchema);
