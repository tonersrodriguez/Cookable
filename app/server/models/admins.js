const Sequelize = require('sequelize');
const db = require('../database');

const admins = db.define('admins', {

    adminID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    adminRole: {
        type: Sequelize.INTEGER,
    }
}, {

    })

module.exports = admins;