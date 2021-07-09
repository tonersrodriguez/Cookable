const Sequelize = require('sequelize');
const db = require('../database');



const recipeI = db.define('recipeImages', {

    recipeImageID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },

    recipeID:{
        type: Sequelize.INTEGER
    },
    recipeImageDir:{
        type: Sequelize.STRING
    },
    createdAt:{
        type: Sequelize.DATE
    },
    recipeID:{
        type: Sequelize.INTEGER
    },

})

module.exports = recipeI;