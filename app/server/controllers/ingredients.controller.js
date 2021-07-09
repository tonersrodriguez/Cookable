const Ingredient = require("../models/ingredients");
const Pantry = require("../models/userHasIngredients");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.ingredientsList = function(req, res) {
  Ingredient.findAll()
    .then(function(ingridients) {
      res.send(ingridients);
    })
    .catch(function(err) {
      res.send("Error");
    });
};

exports.ingredientsSearch = function(req, res) {
  (limit = 20),
    Ingredient.findAll({
      where: {
        ingredientName: { [Op.like]: "%" + req.query.ingredients + "%" }
      }
    })
      .then(ingredients => {
        console.log(ingredients);
        res.json({
          ingredients: ingredients
        });
      })
      .catch(function(err) {
        res.send("Error");
      });
};

exports.ingredientsAdd = function(req, res) {
  Ingredient.create({
    ingredientName: req.body.ingredientName,
    ingredientType: req.body.ingredientType,
    description: req.body.description
  })
    .then(ingridient => {
      console.log(ingridient.get({ plain: true }));
      res.send(ingridient.get({ plain: true }));
    })
    .catch(err => {
      res.send("Error");
      console.log(err);
    });
};

exports.getIngredientfromPantry = async function(req, res) {
  let ingredients;
  try {
    ingredients = await getIngredientsFromPantry(req);
    res.send(ingredients);
  } catch (e) {
    console.log(e);
    res.send("Error");
  }
};

exports.addIngredienttoPantry = function(req, res) {
  try {
    Ingredient.findOrCreate({
      where: {
        ingredientName: { [Op.like]: "%" + req.body.ingredientName + "%" }
      }
    }).then(i => {
      if (i != null) {
        Pantry.findOrCreate({
          where: {
            ingredientID: i.ingredientID,
            ingredientName: i.ingredientName,
            userID: req.body.userID
          }
        }).then(pantry => {
          console.log(pantry)
          res.send(pantry);
        });
      } else {
        res.status(404).send("Ingredient Not Found");
      }
    });
  } catch (e) {
    console.log(e);
    res.send("Error");
  }
};

exports.removeIngredientfromPantry = function(req, res) {
  try{
    Pantry.findOne({
      where: {
        ingredientID: req.body.ingredientID,
        userID: req.body.userID
      }
    }).then((result) => {
      if (result){
        result.destroy();
        res.send('Ingredient has been removed from Pantry');
      }
      else{
        res.send('Cannot find ingredient');
      }
    }).catch(e => {
      res.send('Error: '+ e);
    })
  }
  catch(e){
    res.send('Error: '+ e);
  }

}

// Helper Functions
function getIngredientsFromPantry(req) {
  return Pantry.findAll({
    where: {
      userID: req.query.userID
    }
  });
}