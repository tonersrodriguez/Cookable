const Sequelize = require("sequelize");
const db = require("../database");

const users = db.define("users", {
  userID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username already in use!"
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  salt: {
    type: Sequelize.STRING
  },
  emailAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email address already in use!"
    }
    // allowNull defaults to true
  },
  createdAt: {
    type: Sequelize.DATE
  },
  fName: {
    type: Sequelize.STRING
  },
  lName: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  dob: {
    type: Sequelize.DATE
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = users;
