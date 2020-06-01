const UnitsOfMeasure = require('../models/unitsofmeasure');

module.exports.index_get = async (req, res) => {
  const unitsOfMeasure = await UnitsOfMeasure.find().sort({name: "asc"});
  res.render("unitsofmeasure", {
    unitsOfMeasure,
    page: "unitsofmeasure"
  });
}

module.exports.addunitofmeasure_post = async (req, res) => {
  const {name} = req.body;
  const newUnitOfMeasure = new UnitsOfMeasure({name});
  await newUnitOfMeasure.save();
  res.redirect('/admin/unitsofmeasure')
}

module.exports.deleteunitofmeasure_get = async (req, res) => {
  const {id} = req.params;
  await UnitsOfMeasure.findByIdAndDelete(id);
  
  res.redirect('/admin/unitsofmeasure')
}

module.exports.editunitofmeasure_post = async (req, res) => {
  const {id, name} = req.body;

  await UnitsOfMeasure.findByIdAndUpdate(id, {name});

  res.redirect('/admin/unitsofmeasure');
}