const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    default: process.env.DEFAULT_PASSWORD,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
});

module.exports = mongoose.model('User', UserSchema);
