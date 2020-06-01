const express = require("express");
const passport = require("passport");

const router = express.Router();
const recipeController = require("../controllers/recipeController");
const ingredientController = require("../controllers/ingredientController");
const recipeIngredientsController = require("../controllers/ingredientRecipeController");
const unitsOfMeasureController = require("../controllers/unitsOfMeasureController");

const {
  ensureAuthenticatedAdmin
} = require("../helpers/auth");

router.get("/login", (req, res) => {
  res.render("login", {
    page: ""
  });
});

router.get("/logout", ensureAuthenticatedAdmin, (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have been logged out...');
  res.redirect("/admin/login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    failureFlash: 'Email or Password Incorrect...',
  })(req, res, next);
});

// Recipes Routes

router.get("/", ensureAuthenticatedAdmin, recipeController.index_get);

router.post("/addrecipe", ensureAuthenticatedAdmin, recipeController.addrecipe);

router.post("/editrecipe", ensureAuthenticatedAdmin, recipeController.editrecipe);

router.get("/deleterecipe/:id", ensureAuthenticatedAdmin, recipeController.deleterecipe);

// Ingredients Routes

router.get("/ingredients", ensureAuthenticatedAdmin, ingredientController.index_get);

router.post("/addingredient", ensureAuthenticatedAdmin, ingredientController.addingredient);

router.get("/deleteingredient/:id", ensureAuthenticatedAdmin, ingredientController.deleteingredient);

router.post("/editingredient", ensureAuthenticatedAdmin, ingredientController.editingredient);

// Recipe Ingredients Routes

router.get("/recipeingredients", ensureAuthenticatedAdmin, recipeIngredientsController.index_get);

router.post("/addrecipeingredient", ensureAuthenticatedAdmin, recipeIngredientsController.addrecipeingredient);

router.get("/deleterecipeingredient/:recId/:ingId", ensureAuthenticatedAdmin,recipeIngredientsController.deleterecipeingredient);

router.post("/editrecipeingredient", ensureAuthenticatedAdmin, recipeIngredientsController.editrecipeingredient);

// Units of Measure Routes
router.get('/unitsofmeasure', ensureAuthenticatedAdmin, unitsOfMeasureController.index_get);

router.post('/addunitofmeasure', ensureAuthenticatedAdmin, unitsOfMeasureController.addunitofmeasure_post);

router.get('/deleteunitofmeasure/:id', ensureAuthenticatedAdmin, unitsOfMeasureController.deleteunitofmeasure_get);

router.post('/editunitofmeasure', ensureAuthenticatedAdmin, unitsOfMeasureController.editunitofmeasure_post);

// router.post("/sendmail", mailController.sendMail);

// router.get("/newMealPlan", async (req, res) => {
//   for (var i = 0; i < 7; i++) {
//     if (
//       moment().add(1, "weeks").startOf("week").add(i, "days").format("dddd") !==
//       "Saturday"
//     ) {
//       let dayPlan = new MealPlan();
//       dayPlan.date = moment()
//         .add(1, "weeks")
//         .startOf("week")
//         .add(i, "days")
//         .format("DD/MM/YYYY");
//       dayPlan.user_id = req.user._id;
//       dayPlan.save();
//       console.log(dayPlan);
//     } else {
//       let dayPlan = new MealPlan();
//       dayPlan.date = moment()
//         .add(1, "weeks")
//         .startOf("week")
//         .add(i, "days")
//         .format("DD/MM/YYYY");

//       dayPlan.user_id = req.user._id;
//       dayPlan.save();
//       break;
//     }
//   }
//   res.redirect("/calculator");
// });

module.exports = router;