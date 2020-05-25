const mongoose = require("mongoose");

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
// Schema Setup
const seatsSchema = new mongoose.Schema({
  name: String,
  unitofmeasure: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("ingredients", seatsSchema);
