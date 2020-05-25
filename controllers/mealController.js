const Recipe = require("../models/recipes");

module.exports.index_get = async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: "desc" });
  res.render("recipes", { recipes, page: "admin" });
};

module.exports.deleterecipe = async (req, res) => {
  const { id } = req.params;
  await Recipe.findByIdAndDelete(id);

  res.redirect("/dashboard/admin");
};

module.exports.addrecipe = async (req, res) => {
  let newSeat = new Recipe({
    name: req.body.name,
    type: req.body.type,
    fats: req.body.fats,
    carbs: req.body.carbs,
    netcarbs: req.body.netcarbs,
    proteins: req.body.proteins,
    calories: req.body.calories,
    servings: req.body.servings,
    diet: req.body.diet,
    unit: req.body.unit,
  });
  newSeat.save();

  res.redirect("/dashboard/admin");
};

module.exports.editrecipe = async (req, res) => {
  await Recipe.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    type: req.body.type,
    fats: req.body.fats,
    carbs: req.body.carbs,
    netcarbs: req.body.netcarbs,
    proteins: req.body.proteins,
    calories: req.body.calories,
    servings: req.body.servings,
    diet: req.body.diet,
  });

  res.redirect("/dashboard/admin");
};
