const express = require('express');
const passport = require('passport');
const router = express.Router();

//CONTROLLERS
const AdminController = require("../controllers/admins.controller");
const UserController = require("../controllers/users.controller");
const IngredientsController = require("../controllers/ingredients.controller");
const RecipeController = require("../controllers/recipe.controller");

//ADMIN
router.get("/admin/list", AdminController.adminList);
router.post("/admin/create", AdminController.adminCreate);
router.post("/admin/deleteRecipe", passport.authenticate('jwt', { session: false }), RecipeController.adminDeleteRecipe);

//USERS
router.post("/user/login", UserController.login);
router.post("/user/create", UserController.createUser);
router.get("/user/pantry", IngredientsController.getIngredientfromPantry);
router.post("/user/addtoPantry", IngredientsController.addIngredienttoPantry);
router.post("/user/removefromPantry", IngredientsController.removeIngredientfromPantry);
router.get('/protected', passport.authenticate('jwt', { session: false }), UserController.authenticateUser);
router.get('/user/profile', UserController.getProfile);
router.post('/user/editProfile', UserController.editProfile);
router.post('/user/favorite/add', passport.authenticate('jwt', { session: false }), UserController.addFavorite);
router.post('/user/favorite/remove', passport.authenticate('jwt', { session: false }), UserController.removeFavorite);
router.get('/user/favorites', RecipeController.getFavorite);
router.get('/user/myRecipes', RecipeController.getUserRecipe);
router.post('/user/password/reset', passport.authenticate('jwt', { session: false }), UserController.resetPassword);
router.post("/user/deleteRecipe", passport.authenticate('jwt', { session: false }), RecipeController.userDeleteRecipe);

//INGREDIENTS
router.get("/ingredient/list", IngredientsController.ingredientsList);
router.get("/ingredient/search", IngredientsController.ingredientsSearch);
router.post("/ingredient/add", IngredientsController.ingredientsAdd);

//RECIPES
router.get("/recipe/search", RecipeController.searchRecipe);
router.post("/recipe/create", RecipeController.createRecipe);
router.get("/recipe/instructions", RecipeController.getRecipeInstruction);
router.post("/recipe/search/pantry", RecipeController.pantrySearchRecipe);

//Combined routers below
router.get("/recipe/:id", RecipeController.viewRecipe);

module.exports = router;