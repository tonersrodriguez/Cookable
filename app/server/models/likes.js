const Sequelize = require('sequelize');
const db = require('../database');

const likes = db.define('likes', {

    likesID: {
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

module.exports = likes;