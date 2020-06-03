const fs = require('fs-extra');
const uuid = require('uuid').v1;
const path = require('path');
const Ingredient = require("../models/ingredients");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "hn3xxgv1q",
  api_key: "222999475548242",
  api_secret: "aSJY_c945_TlTqdAxb_SaxcIuHA",
});

module.exports.index_get = async (req, res) => {
  const ingredients = await Ingredient.find().sort({
    name: "asc"
  });
  res.render("ingredients", {
    ingredients,
    page: "ingredient"
  });
};

module.exports.deleteingredient = async (req, res) => {
  try {
    const ing = await Ingredient.findById(req.params.id);
    if (fs.existsSync(ing.imagePath)) fs.unlinkSync(ing.imagePath);
    await Ingredient.findByIdAndDelete(req.params.id);

    res.redirect("/admin/ingredients");
  } catch (error) {
    console.log(error);
    res.send('Server Error')
  }
};

module.exports.addingredient = async (req, res) => {
  try {
    const filePathOld = req.files.image.tempFilePath;
    const fileName = `${uuid()}.${req.files.image.name.split('.').pop()}`;
    const filePathNew = path.resolve(__dirname, `../public/img/ingredients/${fileName}`);
    fs.moveSync(filePathOld, filePathNew);
  
    const newSeat = new Ingredient({
      name: req.body.name,
      category: req.body.category,
      image: fileName
    });
  
    newSeat.save();
  
    res.redirect("/admin/ingredients");
  } catch (error) {
    console.log(error);
    res.send('Server Error')
  }
};

module.exports.editingredient = async (req, res) => {
  await Ingredient.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    category: req.body.category
  });

  if (req.files) {
    const ing = await Ingredient.findById(req.body.id);
    fs.unlinkSync(path.join(__dirname, `../public/img/ingredients/${ing.image}`));
    const filePathOld = req.files.image.tempFilePath;
    const fileName = `${uuid()}.${req.files.image.name.split('.').pop()}`;
    const filePathNew = path.resolve(__dirname, `../public/img/ingredients/${fileName}`);
    fs.moveSync(filePathOld, filePathNew);
    await Ingredient.findByIdAndUpdate(req.body.id, {
      image: fileName
    });
  }

  res.redirect("/admin/ingredients");
};