const Sequelize = require('sequelize');
const db = require('../database');

const recipes = db.define('recipes', {

    url: Sequelize.VIRTUAL
    ,
    recipeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    recipeName: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    cuisine: {
        type: Sequelize.STRING,
    },
    calorieCount: {
        type: Sequelize.INTEGER,
    },
    servingSize: {
        type: Sequelize.INTEGER,
    },
    cookingTime: {
        type: Sequelize.STRING,
    },
    authorName: {
        type: Sequelize.STRING,
    },
    isUserCreated: {
        type: Sequelize.TINYINT,
    },
    userID: {
        type: Sequelize.INTEGER,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
}, {

    })

module.exports = recipes;