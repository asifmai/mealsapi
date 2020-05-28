const Recipe = require("../models/recipes");
const uuid = require('uuid').v1;
const fs = require('fs-extra');
const path = require('path');

module.exports.index_get = async (req, res) => {
  const recipes = await Recipe.find().sort({
    createdAt: "desc"
  });
  res.render("recipes", {
    recipes,
    page: "admin"
  });
};

module.exports.deleterecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (fs.existsSync(recipe.imagePath)) fs.unlinkSync(recipe.imagePath);
    await Recipe.findByIdAndDelete(req.params.id);

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.send('Server Error')
  }
};

module.exports.addrecipe = async (req, res) => {
  try {
    const filePathOld = req.files.image.tempFilePath;
    const fileName = `${uuid()}.${req.files.image.name.split('.').pop()}`;
    const filePathNew = path.resolve(__dirname, `../public/img/recipes/${fileName}`);
    fs.moveSync(filePathOld, filePathNew);

    let newRecipe = new Recipe({
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
      image: fileName,
    });
    await newRecipe.save();

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.send('Server Error');
  }
};

module.exports.editrecipe = async (req, res) => {
  try {
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

    if (req.files) {
      const recipe = await Recipe.findById(req.body.id);
      fs.unlinkSync(path.join(__dirname, `../public/img/recipes/${recipe.image}`));
      const filePathOld = req.files.image.tempFilePath;
      const fileName = `${uuid()}.${req.files.image.name.split('.').pop()}`;
      const filePathNew = path.resolve(__dirname, `../public/img/recipes/${fileName}`);
      fs.moveSync(filePathOld, filePathNew);
      await Recipe.findByIdAndUpdate(req.body.id, {
        image: fileName
      });
    }

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.send('Server Error');
  }
};