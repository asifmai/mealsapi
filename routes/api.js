const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const allowedUsers = require('../helpers/allowedusers');
const User = require('../models/User');
const Profile = require('../models/Profile');
const authMW = require('../middleware/authMw');
const Recipe = require('../models/recipes');

router.post('/login', async (req, res, next) => {
  try {
    // Check if email field exists in body
    if (!req.body.email) {
      return res.status(400).send('Please send a user email with the request...');
    }

    // check if email is in allowed users list
    const email = req.body.email.toLowerCase();
    if (!allowedUsers.some(au => au.toLowerCase() == email.toLowerCase())) {
      return res.status(400).send('The email is not allowed...');
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

    // Return jsonwebtoken
    const payload = {
      user: {
        id: foundUser.id
      }
    };

    const userDetails = await User.find({email}).select('-password -firstName -lastName')
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: parseInt(process.env.JWT_EXPIRE) },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          newUser,
          token,
          user: userDetails
        });
      }
    ); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

const registerUser = async (email) => {
  try {
    const newUser = new User({email });
    await newUser.save();
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

router.get('/me', authMW, async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.user.email}).populate('profile').exec();
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/profile', authMW, async (req, res, next) => {
  try {
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

    // if (req.body.profileId) {

    // } else {
      
    // }


    const newProfile = new Profile({
      name, height, weight, age, activityLevel, noOfMeals, calories, carbs, fats, proteins
    })
    await newProfile.save();
    await User.findByIdAndUpdate(req.user.id, {profile: newProfile.id});
    res.status(200).send('Profile added...');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/meals', authMW, async (req, res, next) => {
  try {
    res.status(200).send('Meals get route');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/meals', authMW, async (req, res, next) => {
  try {
    res.status(200).send('Meals post route');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.get('/recipes', authMW, async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate({
      path: 'ingredients',
      populate: {
        path: 'ingredient',
        model: 'Ingredient'
      }
    }).sort({name: "asc"});

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
