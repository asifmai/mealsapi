const express = require("express");
const passport = require("passport");

const router = express.Router();
const recipeController = require("../controllers/recipeController");
const ingredientController = require("../controllers/ingredientController");
// const mailController = require("../controllers/mailController");
const recipeIngredients = require("../controllers/ingredientRecipeController");

const {
  ensureAuthenticatedAdmin
} = require("../helpers/auth");

router.get('/', (req, res) => {
  res.redirect('/dashboard/admin');
})

router.get("/login", (req, res) => {
  res.render("login", { page: "" });
});

router.get("/logout", ensureAuthenticatedAdmin, (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have been logged out...');
  res.redirect("/dashboard/login");
});

router.post("/login", (req, res, next) => {
  console.log("hit routes");
  passport.authenticate("local", {
    successRedirect: "/dashboard/admin",
    failureRedirect: "/dashboard/login",
    failureFlash: 'Email or Password Incorrect...',
  })(req, res, next);
});

router.get("/admin", ensureAuthenticatedAdmin, recipeController.index_get);

router.post("/addrecipe", ensureAuthenticatedAdmin, recipeController.addrecipe);

router.get(
  "/deleterecipe/:id",
  ensureAuthenticatedAdmin,
  recipeController.deleterecipe
);

router.post(
  "/editrecipeingredient",
  ensureAuthenticatedAdmin,
  recipeIngredients.editrecipeingredient
);

router.get(
  "/recipeingredient",
  ensureAuthenticatedAdmin,
  recipeIngredients.index_get
);

router.post(
  "/addrecipeingredient",
  ensureAuthenticatedAdmin,
  recipeIngredients.addrecipeingredient
);

router.get(
  "/deleterecipeingredient/:id",
  ensureAuthenticatedAdmin,
  recipeIngredients.deleterecipeingredient
);

router.post("/editrecipe", ensureAuthenticatedAdmin, recipeController.editrecipe);

router.get("/ingredient", ensureAuthenticatedAdmin, ingredientController.index_get);

router.post(
  "/addingredient",
  ensureAuthenticatedAdmin,
  ingredientController.addingredient
);

router.get(
  "/deleteingredient/:id",
  ensureAuthenticatedAdmin,
  ingredientController.deleteingredient
);

router.post(
  "/editingredient",
  ensureAuthenticatedAdmin,
  ingredientController.editingredient
);

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
