const Sequelize = require('sequelize');
const db = require('../database');


const instructions = db.define('instructions', {

    instructionKeyID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },

    recipeID:{
        type: Sequelize.INTEGER
    },
    stepNumber:{
        type: Sequelize.INTEGER
    },
    instruction:{
        type: Sequelize.STRING
    }
})

module.exports = instructions;