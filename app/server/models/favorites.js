const Sequelize = require('sequelize');
const db = require('../database');

const favorites = db.define('favorites', {

    favoritesID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recipeID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {

    })

module.exports = favorites;