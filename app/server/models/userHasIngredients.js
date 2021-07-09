const Sequelize = require('sequelize');
const db = require('../database');

const pantryHasIngredients =  db.define('userHasIngredients', {

    pantryID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ingredientID:{
        type: Sequelize.INTEGER
    },
    ingredientName: {
        type: Sequelize.STRING
    },
    userID:{
        type: Sequelize.INTEGER
    }
})

module.exports = pantryHasIngredients;