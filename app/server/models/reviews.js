const Sequelize = require('sequelize');
const db = require('../database');

const reviews = db.define('reviews', {

    reviewID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING
    },
    recipeID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {

    })

module.exports = reviews;