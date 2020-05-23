const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const allowedUsers = require('../helpers/allowedusers');
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMW = require('../middleware/authMw');

router.post('/login', async (req, res, next) => {
  try {
    // Check if email field exists in body
    if (!req.body.email) {
      return res.status(200).send('Please send a user email with the request...');
    }

    // check if email is in allowed users list
    const email = req.body.email.toLowerCase();
    if (!allowedUsers.some(au => au.toLowerCase() == email.toLowerCase())) {
      return res.status(200).send('The email is not allowed...');
    }

    // Check if user is registered or not
    let newUser = false;
    let foundUser = await User.findOne({email});
    if (!foundUser) {
      // Register the User
      await registerUser(email);
      foundUser = await User.findOne({email});
      newUser = true;
    }

    // Return jsonwebtoken (So user is logged in as he registers)
    const payload = {
      user: {
        id: foundUser.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: parseInt(process.env.JWT_EXPIRE) },      // Expires in an hour
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          newUser,
          token
        });
      }
    ); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

const registerUser = async (email) => {
  const newUser = new User({email });
  await newUser.save();
}

router.get('/me', authMW, async (req, res, next) => {
  const user = await User.findOne({email: req.user.email}).populate('profile').exec();
  res.status(200).json(user);
})

router.post('/profile', authMW, async (req, res, next) => {
  console.log(req.body);
  const {
    name,
    height,
    weight,
    age,
    activityLevel,
    noOfMeals,
    calories,
    carbs,
    fats,
    proteins
  } = req.body;
  const newProfile = new Profile({
    name, height, weight, age, activityLevel, noOfMeals, calories, carbs, fats, proteins
  })
  await newProfile.save();
  await User.findOneAndUpdate(req.user.id, {profile: newProfile.id});
  res.status(200).send('Profile added...');
});

router.get('/meals', authMW, async (req, res, next) => {
  res.status(200).send('Meals get route')
})

router.post('/meals', authMW, async (req, res, next) => {
  res.status(200).send('Meals post route')
})

module.exports = router;
