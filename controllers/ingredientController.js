const Ingredient = require("../models/ingredients");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "hn3xxgv1q",
  api_key: "222999475548242",
  api_secret: "aSJY_c945_TlTqdAxb_SaxcIuHA",
});

module.exports.index_get = async (req, res) => {
  const ingredients = await Ingredient.find().sort({ createdAt: "desc" });
  res.render("ingredients", { ingredients, page: "ingredient" });
};

module.exports.deleteingredient = async (req, res) => {
  const { id } = req.params;
  await Ingredient.findByIdAndDelete(id);
  res.redirect("/dashboard/ingredient");
};
module.exports.addingredient = async (req, res) => {
  const { name, unitofmeasure } = req.body;

  const newSeat = new Ingredient({ name, unitofmeasure });
  newSeat.save();
  res.redirect("/dashboard/ingredient");
};

module.exports.editingredient = async (req, res) => {
  const {  name, unitofmeasure } = req.body;

  await Ingredient.findByIdAndUpdate(req.body.id, {
    name: name,
    unitofmeasure: unitofmeasure,
  });

  res.redirect("/dashboard/ingredient");
};
