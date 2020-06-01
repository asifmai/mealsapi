const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients");
const UnitOfMeasure = require('../models/unitsofmeasure');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "hn3xxgv1q",
  api_key: "222999475548242",
  api_secret: "aSJY_c945_TlTqdAxb_SaxcIuHA",
});

module.exports.index_get = async (req, res) => {
  const recipes = await Recipe.find().populate({
    path: 'ingredients',
    populate: {
      path: 'ingredient',
      model: 'Ingredient'
    }
  }).sort({
    name: "asc"
  });

  const ingredients = await Ingredient.find().sort({name: "asc"});
  const unitsofmeasure = await UnitOfMeasure.find().sort({name: 'asc'});

  res.render("recipeingredient", {
    recipes,
    ingredients,
    unitsofmeasure,
    page: "recipeingredient",
  });
};

module.exports.deleterecipeingredient = async (req, res) => {
  const {
    recId,
    ingId
  } = req.params;
  const recipe = await Recipe.findById(recId);
  let recipeIngredients = recipe.ingredients;
  recipeIngredients = recipeIngredients.filter(ri => ri.ingredient != ingId);

  await Recipe.findByIdAndUpdate(recId, {
    ingredients: recipeIngredients
  });

  res.redirect("/admin/recipeingredients");
};

module.exports.addrecipeingredient = async (req, res) => {
  const {
    ingredientID,
    recipeID,
    unitOfMeasure,
    amount
  } = req.body;

  const recipe = await Recipe.findById(recipeID);
  const recipeIngredients = recipe.ingredients;

  recipeIngredients.push({
    amount,
    unitOfMeasure,
    ingredient: ingredientID,
  });

  await Recipe.findByIdAndUpdate(recipeID, {
    ingredients: recipeIngredients
  });

  res.redirect("/admin/recipeingredients");
};

module.exports.editrecipeingredient = async (req, res) => {
  const {
    recipeIdOld,
    ingredientIdOld,
    recipeId,
    ingredientId,
    unitOfMeasure,
    amount
  } = req.body;

  const recipe = await Recipe.findById(recipeIdOld);
  const recipeIngredients = recipe.ingredients;

  const recipeIngredientsNew = recipeIngredients.map(ri => {
    if (ri.ingredient == ingredientIdOld) {
      return {
        amount,
        unitOfMeasure,
        ingredient: ingredientIdOld
      }
    } else {
      return ri;
    }
  })

  await Recipe.findByIdAndUpdate(recipeIdOld, {
    ingredients: recipeIngredientsNew
  });

  res.redirect("/admin/recipeingredients");
};