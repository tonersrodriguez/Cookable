const express 			= require('express');

const router 			= express.Router();

const AdminController   = require("../controllers/admins.controller");
const UserController   = require("../controllers/users.controller");
const IngredientsController   = require("../controllers/ingredients.controller");
const Recipe = require("../controllers/recipe.controller");

router.get("/admins", AdminController.adminList);
router.post("/createAdmin", AdminController.adminCreate);
router.post("/createUser", UserController.createUser);
router.post("/login", UserController.login);
router.get("/allIngredients", IngredientsController.ingredientsList);
router.get("/searchIngredients", IngredientsController.ingredientsSearch);
router.post("/createIngredient", IngredientsController.ingredientsAdd);
router.get("/searchRecipe", Recipe.searchRecipe);
router.post("/createRecipe", Recipe.createRecipe);
router.get("/recommendation", Recipe.getRecommendation);
router.get("/getIngredient", IngredientsController.getIngredientfromPantry);
router.post("/addIngredient", IngredientsController.addIngredienttoPantry);

module.exports = router;