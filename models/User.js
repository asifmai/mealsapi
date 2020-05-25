const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
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
  role: {
    type: String,
    default: 'user',
    required: true,
  }
});

module.exports = mongoose.model('User', UserSchema);
