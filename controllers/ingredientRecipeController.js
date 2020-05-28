const recipeIngredients = require("../models/recipeingredients");
const Recipe = require("../models/recipes");
const Ingredient = require("../models/ingredients");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "hn3xxgv1q",
  api_key: "222999475548242",
  api_secret: "aSJY_c945_TlTqdAxb_SaxcIuHA",
});

module.exports.index_get = async (req, res) => {
  // let recipes = await recipeIngredients.find().populate('recipeId ingredientId').sort({ createdAt: "desc" });

  const recipes = await Recipe.find().populate({
    path: 'ingredients',
    populate: {
      path: 'ingredient',
      model: 'Ingredient'
    }
  }).sort({createdAt: "desc"});
  const ingredients = await Ingredient.find().sort({createdAt: "desc"});

  res.render("recipeingredient", {
    // recipes,
    recipes,
    ingredients,
    page: "recipeingredient",
  });
};

module.exports.deleterecipeingredient = async (req, res) => {
  const {recId, ingId} = req.params;
  const recipe = await Recipe.findById(recId);
  let recipeIngredients = recipe.ingredients;
  recipeIngredients = recipeIngredients.filter(ri => ri.ingredient != ingId);

  await Recipe.findByIdAndUpdate(recId, {ingredients: recipeIngredients});

  res.redirect("/admin/recipeingredients");
};

module.exports.addrecipeingredient = async (req, res) => {
  const {
    ingredientID,
    recipeID,
    amount
  } = req.body;

  const recipe = await Recipe.findById(recipeID);
  const recipeIngredients = recipe.ingredients;

  recipeIngredients.push({
    amount,
    ingredient: ingredientID,
  });

  await Recipe.findByIdAndUpdate(recipeID, {ingredients: recipeIngredients});

  res.redirect("/admin/recipeingredients");
};

module.exports.editrecipeingredient = async (req, res) => {
  const {
    ingredientID,
    recipeID,
    amount
  } = req.body;

  await recipeIngredients.findByIdAndUpdate(req.body.id, {
    ingredientID: ingredientID,
    recipeID: recipeID,
    amount: amount,
  });
  res.redirect("/dashboard/recipeingredient");
};