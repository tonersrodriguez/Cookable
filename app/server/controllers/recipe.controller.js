const Recipe = require("../models/recipe");
const User = require("../models/users");
const Favorites = require("../models/favorites");
const Likes = require("../models/likes");
const Reviews = require("../models/reviews");
const Sequelize = require("sequelize");
const RecipeImages = require("../models/recipeImages");
const ingredientList = require("../models/ingredientsListFulls");
const instructions = require("../models/instructions");
const defaultImageUrl =
  "https://www.creativefabrica.com/wp-content/uploads/2018/09/Crossed-spoon-and-fork-logo-by-yahyaanasatokillah-580x387.jpg";
const Op = Sequelize.Op;

exports.createRecipe = function (req, res) {

  try {
    if (req.body.id == null || req.body.recipeName == null || req.body.description == null || req.body.cuisine == null || req.body.cookingTime == null || req.body.instructions == null || req.body.ingredients == null || req.body.imageUrl == null) {
      res.status(400).send("Incomplete request. Please send full requirements.");
    }
  } catch (err) {
    res.status(400).send("Incorrect body received: " + err);
  }

  Recipe.create({
    recipeName: req.body.recipeName,
    description: req.body.description,
    cuisine: req.body.cuisine,
    cookingTime: req.body.cookingTime,
    userID: req.body.id
  })
    .then(recipe => {

      //Get bulk create ready
      // {recipeID, ingredientsIndex, ingredientsFull} {recipeID, stepNumber, instruction}
      let ingredientsArray = [];
      let instructionsArray = [];

      for (let x = 0; x < req.body.ingredients.length; x++) {
        let index = x + 1;
        ingredientsArray.push({ recipeID: recipe.recipeID, ingredientsIndex: index, ingredientsFull: req.body.ingredients[x] });
      }

      for (let x = 0; x < req.body.instructions.length; x++) {
        let step = x + 1;
        instructionsArray.push({ recipeID: recipe.recipeID, stepNumber: step, instruction: req.body.instructions[x] });
      }

      //Create instruction and ingredients array and image
      const addImageUrl = RecipeImages.create({ recipeID: recipe.recipeID, recipeImageDir: req.body.imageUrl });
      const addIngredientsList = ingredientList.bulkCreate(ingredientsArray);
      const addInstructions = instructions.bulkCreate(instructionsArray);

      Promise.all([addImageUrl, addIngredientsList, addInstructions]).then(rec => {

        res.send(recipe.get({ plain: true }));

      }).catch(err => {
        res.status(500).send("Server Error: " + err);
        console.log(err);
      });;
    })
    .catch(err => {
      res.status(500).send("Server Error: " + err);
      console.log(err);
    });
};

exports.getFavorite = function (req, res) {
  let arr = [];
  Favorites.findAll({
    where: {
      userID: req.query.userID
    }
  })
    .then(r => {
      for (let i = 0; i < r.length; i++) {
        arr[i] = r[i].recipeID;
      }
      console.log(arr);
      Recipe.findAll({
        where: {
          recipeID: arr
        }
      }).then(async recipe => {
        let arr2 = await getarray(recipe);
        let recipeurl = await getImageUrl(arr2);
        recipe = await combinethem(recipe, recipeurl);
        res.json(recipe);
      });
    })
    .catch(e => {
      res.send("Error: " + e);
    });
};

exports.getUserRecipe = function (req, res) {
  Recipe.findAll({
    where: {
      userID: req.query.userID
    }
  }).then(async recipe => {
    let arr2 = await getarray(recipe);
    let recipeurl = await getImageUrl(arr2);
    recipe = await combinethem(recipe, recipeurl);
    res.json(recipe);
  });
};

exports.getRecommendation = async function (req, res) {
  let recipe;
  let arr = [];
  let recipeurl;
  try {
    recipe = await getRecipe();
    arr = await getarray(recipe);
    recipeurl = await getImageUrl(arr);
    recipe = await combinethem(recipe, recipeurl);
    res.json(recipe);
  } catch (e) {
    res.send("Error: " + e);
  }
};

exports.searchRecipe = async function (req, res) {
  try {
    let recipeSearch;
    let ingredientSearch;
    recipeSearch = await searchByRecipe(req.query.recipe);
    ingredientSearch = await searchByIngredient(req.query.recipe);
    let result = recipeSearch.concat(ingredientSearch).unique();
    res.status(200).json(result);
  } catch (e) {
    res.status(200).send("Error: " + e);
  }
};

Array.prototype.unique = function () {
  var a = this.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].recipeID === a[j].recipeID) a.splice(j--, 1);
    }
  }
  return a;
};

async function searchByRecipe(req) {
  let recipe;
  let arr = [];
  let recipeurl;
  try {
    recipe = await getRecipeByName(req);
    arr = await getarray(recipe);
    recipeurl = await getImageUrl(arr);
    recipe = await combinethem(recipe, recipeurl);
    return recipe;
  } catch (e) {
    return e;
  }
}

async function searchByIngredient(req) {
  let recipe;
  let ingredientused;
  let arr = [];
  let recipeurl;
  try {
    ingredientused = await getRecipeByIngredient(req);

    arr = await getarrayinorder(ingredientused);
    recipe = await getRecipei(arr);
    recipeurl = await getImageUrl(arr);
    recipe = await combinethem(recipe, recipeurl);
    return recipe;
  } catch (e) {
    return e;
  }
}

exports.viewRecipe = function (req, res) {
  Recipe.hasMany(RecipeImages, { foreignKey: "recipeID" });
  Recipe.hasMany(Likes, { foreignKey: "recipeID" });
  Recipe.hasMany(Favorites, { foreignKey: "recipeID" });
  Recipe.hasMany(Reviews, { foreignKey: "recipeID" });
  Recipe.hasMany(instructions, { foreignKey: "recipeID" });
  Recipe.hasMany(ingredientList, { foreignKey: "recipeID" });

  RecipeImages.belongsTo(Recipe, { foreignKey: "recipeID" });
  Likes.belongsTo(Recipe, { foreignKey: "recipeID" });
  Favorites.belongsTo(Recipe, { foreignKey: "recipeID" });
  Reviews.belongsTo(Recipe, { foreignKey: "recipeID" });
  instructions.belongsTo(Recipe, { foreignKey: "recipeID" });
  ingredientList.belongsTo(Recipe, { foreignKey: "recipeID" });

  Recipe.findOne({
    where: { recipeID: req.params.id },
    include: [
      RecipeImages,
      Likes,
      Favorites,
      Reviews,
      instructions,
      ingredientList
    ]
  })
    .then(recipe => {
      res.send(recipe);
    })
    .catch(err => res.status(500).send("Error: " + err));
};


//Pantry search, in general calls instances of multiple sequalize and regex to get a list of ingredients that includes a user's ingredients.
exports.pantrySearchRecipe = function (req, res) {
  let searchArray = "";
  req.body.list.forEach(element => {
    searchArray = searchArray + element + "|";
  });
  searchArray = searchArray.substring(0, searchArray.length - 1);

  const ingredientMatchCount = ingredientList.findAll({
    group: ["recipeID"],
    attributes: ["recipeID", [Sequelize.fn("COUNT", "recipeID"), "count"]],
    where: {
      ingredientsFull: { [Op.regexp]: searchArray }
    }
  });

  const allCount = ingredientList.findAll({
    group: ["recipeID"],
    attributes: ["recipeID", [Sequelize.fn("COUNT", "recipeID"), "count"]]
  });

  Promise.all([ingredientMatchCount, allCount])
    .then(promises => {
      let results = [];
      for (let x = 0; x < promises[0].length; x++) {
        for (let y = 0; y < promises[1].length; y++) {
          if (promises[0][x].dataValues.recipeID == promises[1][y].dataValues.recipeID && promises[0][x].dataValues.count == promises[1][y].dataValues.count) {
            results.push(promises[0][x].dataValues.recipeID);
          }
        }
      }

      if(results.length === 0)
      {
        res.json({msg: "Nothing found"});
      }

      const recipeImages = Recipe.findAll({
        where: {
          recipeID: { [Op.or]: results }
        }
      })

      const recipeInfo = RecipeImages.findAll({
        where: {
          recipeID: { [Op.or]: results }
        }
      })

      Promise.all([recipeImages, recipeInfo]).then(prom => {
        let rez = [];
        let alreadyIn = false;

        for (let x = 0; x < prom[0].length; x++) {
          for (let y = 0; y < prom[1].length; y++) {
            if (prom[0][x].dataValues.recipeID === prom[1][y].dataValues.recipeID) {
              rez.push(Object.assign(prom[0][x].dataValues, prom[1][y].dataValues));
              alreadyIn = true;
            }
          }
          if (!alreadyIn) { rez.push(Object.assign(prom[0][x].dataValues, { "recipeImageDir": defaultImageUrl })); }
          alreadyIn = false;
        }
        res.send(rez);

      }).catch(err => res.status(500).send("Error: " + err))

    }).catch(err => res.status(500).send("Error: " + err))
};

exports.getRecipeInstruction = function (req, res) {
  Recipe.findOne({
    where: { recipeName: { [Op.like]: "%" + req.query.recipeName + "%" } }
  })
    .then(recipe => {
      if (recipe != null) {
        instructions
          .findAll({
            where: {
              recipeID: recipe.recipeID
            }
          })
          .then(i => {
            res.json(i);
          })
          .catch(e => {
            console.log(e);
            res.status(500).send("Errror: " + e);
          });
      } else {
        res.status(404).send("Cannot find Instruction");
      }
    })
    .catch(e => {
      res.send("Error");
      console.log(e);
    });
};

exports.adminDeleteRecipe = function (req, res) {
  User.findOne({
    where: {
      userID: req.body.userID
    }
  })
    .then(user => {
      if (user.isAdmin) {
        deleteRecipe(req, res, user.isAdmin);
      } else {
        res.json({ msg: "Error: User is not Admin" });
      }
    })
    .catch(e => {
      res.send("Error: " + e);
    });
};

exports.userDeleteRecipe = function (req, res) {
  deleteRecipe(req, res, false);
};

// helper functions

function deleteRecipe(req, res, isAdmin) {
  Recipe.findOne({
    where: {
      recipeID: req.body.recipeID
    }
  }).then(recipe => {
    if (!isAdmin && !recipe.userID === req.user.userID) {
      res.status(401).send("User is not authorized");
    }

    if (recipe) {

      const imageDelete = RecipeImages.destroy({
        where: {
          recipeID: req.body.recipeID
        }
      });
      
      const ingredientDelete = ingredientList.destroy({
        where: {
          recipeID: req.body.recipeID
        }
      });

      const instructionDelete = instructions.destroy({
        where: {
          recipeID: req.body.recipeID
        }
      });

      const favoriteDelete = Favorites.destroy({
        where: {
          recipeID: req.body.recipeID
        }
      });

      const likeDelete = Likes.destroy({
        where: {
          recipeID: req.body.recipeID
        }
      });

      const reviewDelete = Reviews.destroy({
        where: {
          recipeID: req.body.recipeID
        }
      });

      const recipeDelete = recipe.destroy();

      Promise.all([imageDelete, ingredientDelete, instructionDelete, favoriteDelete, likeDelete, reviewDelete]).then(prom => {
        Promise.all([recipeDelete]).then(rec =>{
          
          res.json({ msg: "Recipe removed" });

        }).catch(err => res.status(500).send("Error: " + err));
      }).catch(err => res.status(500).send("Error: " + err)); 
    } else {
      res.send({ msg: "Recipe not found" });
    }
  });
}

function getRecipeByName(req) {
  return Recipe.findAll({
    where: {
      recipeName: { [Op.like]: "%" + req + "%" }
    },
    raw: true
  });
}

function getRecipeByIngredient(req) {
  return ingredientList.findAll({
    where: {
      ingredientsFull: { [Op.like]: "%" + req + "%" }
    },
    raw: true
  });
}

function getarrayinorder(recipe) {
  let arr = [];
  let temp = -1;
  for (let i = 0; i < recipe.length; i++) {
    if (temp != recipe[i].recipeID) {
      arr[i] = recipe[i].recipeID;
      temp = arr[i];
      recipe[i].url = defaultImageUrl;
    } else {
      recipe.splice(i, 1);
      i--;
    }
  }
  return arr;
}

function getarray(recipe) {
  let arr = [];
  for (let i = 0; i < recipe.length; i++) {
    {
      arr[i] = recipe[i].recipeID;
      recipe[i].url = defaultImageUrl;
    }
  }
  return arr;
}

function combinethem(recipe, recipeUrl) {
  for (let i = 0; i < recipe.length; i++) {
    for (let j = 0; j < recipeUrl.length; j++) {
      if (recipe[i].recipeID === recipeUrl[j].recipeID) {
        recipe[i].url = recipeUrl[j].recipeImageDir;
        break;
      }
    }
  }
  return recipe;
}

function getRecipe() {
  return Recipe.findAll({
    order: [[Sequelize.literal("RAND()")]],
    limit: 8
  });
}

function getImageUrl(arr) {
  return RecipeImages.findAll({
    where: {
      recipeID: arr
    }
  });
}

function getRecipei(arr) {
  return Recipe.findAll({
    where: {
      recipeID: arr
    }
  });
}
