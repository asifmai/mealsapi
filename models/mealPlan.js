const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
// Schema Setup
const seatsSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("mealPlan", seatsSchema);
