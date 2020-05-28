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
    type: String,
    required: true,
  },
  image: String,
  ingredients: [
    {
      amount: Number,
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

// JSON
RecipeSchema.set('toObject', {virtuals: true});
RecipeSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model("Recipe", RecipeSchema);
