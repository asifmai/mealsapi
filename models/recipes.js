const mongoose = require("mongoose");
const path = require('path');

// Schema Setup
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  type: [{
    type: String,
    required: true,
  }],
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
  fiber: {
    type: Number,
    required: true,
  },
  sugaralcohol: {
    type: Number,
    required: true,
  },
  cupsofveggies: {
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
  diet: [{
    type: String,
    required: true,
  }],
  image: String,
  ingredients: [
    {
      amount: Number,
      unitOfMeasure: String,
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
      }
    }
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Virtuals
RecipeSchema.virtual('imagePath').get(function() {
  return path.resolve(__dirname, `../public/img/recipes/${this.image}`);
});

RecipeSchema.virtual('netCarbs').get(function() {
  return this.carbs - this.fiber - this.sugaralcohol;
});

// JSON
RecipeSchema.set('toObject', {virtuals: true});
RecipeSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model("Recipe", RecipeSchema);
