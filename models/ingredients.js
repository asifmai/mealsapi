const mongoose = require("mongoose");
const path = require('path');

// Schema Setup
const IngredientSchema = new mongoose.Schema({
  name: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Virtuals
IngredientSchema.virtual('imagePath').get(function() {
  return path.resolve(__dirname, `../public/img/ingredients/${this.image}`);
});

// JSON
IngredientSchema.set('toObject', {virtuals: true});
IngredientSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model("Ingredient", IngredientSchema);
