const mongoose = require("mongoose");

// Schema Setup
const seatsSchema = new mongoose.Schema({
  ingredientID: String,
  recipeID: String,
  amount: Number,
});

module.exports = mongoose.model("recipeingredients", seatsSchema);
