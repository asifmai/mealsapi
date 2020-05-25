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
  let recipes = await recipeIngredients.find().sort({ createdAt: "desc" });
  console.log("ss", recipes);
  recipes = await Promise.all(
    recipes.map(async (item) => {
      const recipe = await Recipe.findOne({ _id: item.recipeID });

      const ingredient = await Ingredient.findOne({ _id: item.ingredientID });
      let tempobj = {
        recipe,
        ingredient,
        _id: item._id,
        amount: item.amount,
      };
      return tempobj;
    })
  ).then((res) => res);

  const recipe = await Recipe.find().sort({ _id: "desc" });
  const ingredients = await Ingredient.find().sort({ _id: "desc" });
  res.render("recipeingredient", {
    recipes,
    recipe,
    ingredients,
    page: "recipeingredient",
  });

};

module.exports.deleterecipeingredient = async (req, res) => {
  const { id } = req.params;
  await recipeIngredients.findByIdAndDelete(id);

  res.redirect("/dashboard/recipeingredient/");
};
module.exports.addrecipeingredient = async (req, res) => {
  const { ingredientID, recipeID, amount } = req.body;

  const newSeat = new recipeIngredients({ ingredientID, recipeID, amount });
  await newSeat.save();
  res.redirect("/dashboard/recipeingredient");
};
 
module.exports.editrecipeingredient = async (req, res) => {
  const { ingredientID, recipeID, amount } = req.body;

  await recipeIngredients.findByIdAndUpdate(req.body.id, {
    ingredientID: ingredientID,
    recipeID: recipeID,
    amount: amount,
  });
  res.redirect("/dashboard/recipeingredient");
};
