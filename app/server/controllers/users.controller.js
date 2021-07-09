const User = require("../models/users");
const Ingredient = require("../models/ingredients");
const Favortie = require("../models/favorites");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Op = Sequelize.Op;
let secretOrKey = "cinamonbun";

exports.createUser = function (req, res) {
  let salt = crypto.randomBytes(16).toString("hex");
  let pass = req.body.password;
  let hash = crypto.pbkdf2Sync(pass, salt, 10000, 512, "sha512").toString();

  User.findOrCreate({
    where: {
      username: req.body.username,
      password: hash,
      emailAddress: req.body.email,
      salt: salt
    }
  })
    .then(([user, created]) => {
      console.log(created);
      res.json({
        username: req.body.username,
        password: pass,
        emailAddress: req.body.email
      });
    })
    .catch(err => {
      if (err.name == "SequelizeUniqueConstraintError") {
        res.send("Username and/or Email already in use");
      } else {
        res.status(500).send("Error: Server side issue. " + err);
      }
    });
};

exports.login = function (req, res) {
  User.findOne({
    where: {
      [Op.or]: [{ username: req.body.user }, { emailAddress: req.body.user }]
    }
  })
    .then(result => {
      if (result != null) {

        let hash = crypto
          .pbkdf2Sync(req.body.password, result.salt, 10000, 512, "sha512")
          .toString();

        if (result.password === hash) {
          let payload = { sub: result.userID };
          let token = jwt.sign(payload, secretOrKey);
          res.json({
            userID: result.userID,
            username: result.username,
            emailAddress: result.emailAddress,
            createdAt: result.createdAt,
            isAdmin: result.isAdmin,
            token: token
          });
        }
        else {
          res.send("Incorrect Password");
        }

      } else {
        res.send("User does not exist");
      }
    })
    .catch(err =>
      res.status(500).send("Error: Please send correct object" + err)
    );
};

exports.authenticateUser = function (req, res) {
  res.json({
    msg: 'Congrats! You are seeing this because you are authorized',
    "userID": req.user.userID,
    "username": req.user.username,
    "emailAddress": req.user.emailAddress,
    "isAdmin": req.user.isAdmin
  });
};

exports.editProfile = function (req, res) {
  User.findOne({
    where: {
      userID: req.body.userID
    },
    attributes: { exclude: ['password', 'salt', 'createdAt'] }
  }).then(result => {
    result.update(
      { fName: req.body.fName },
      { lName: req.body.lName },
      { dob: req.body.dob },
      { gender: req.body.lName },
    )
    res.status(200).json(result)
  }).catch(e => {
    console.log(e);
    res.status(500).send('Error: ' + e);
  })
}

exports.getProfile = function (req, res) {
  User.findOne({
    where: {
      userID: req.query.userID
    },
    attributes: { exclude: ['password', 'salt', 'createdAt'] }
  }).then(result => {
    res.status(200).json(result)
  }).catch(e => {
    console.log(e);
    res.status(500).send('Error: ' + e);
  })
}

exports.addFavorite = function (req, res) {

  Favortie.findOrCreate({
    where: {
      userID: req.user.userID,
      recipeID: req.body.recipeID
    }
  }).then(([favorite, created]) => {
    console.log(req.body.recipeID);
    if (!created) {
      res.json({ msg: "Already favorited", created: true });
    }
    else {
      favorite.recipeID = req.body.recipeID;
      favorite.save();
      res.status(201).json(favorite);
    }
  }).catch(e => {
    console.log(e);
    res.status(500).send('Error: ' + e);
  })
}

exports.removeFavorite = function (req, res) {

  Favortie.findOne({
    where: {
      userID: req.user.userID,
      recipeID: req.body.recipeID
    }
  }).then((favorite) => {
    if (favorite) {
      favorite.destroy();
      res.json({ msg: "Favorite removed" });
    }
    else {
      res.json({ msg: "No favorite found." })
    }
  }).catch(e => {
    console.log(e);
    res.status(500).send('Error: ' + e);
  })
}

exports.resetPassword = function (req, res) {

  User.findOne({
    where: {
      userID: req.user.userID
    }
  }).then((user) => {

    if(!user)
    {
      res.status(404).send("User not found!");
    }

    let newhash = crypto.pbkdf2Sync(req.body.password, user.salt, 10000, 512, "sha512").toString();
    user.password = newhash;
    user.save();
    res.status(200).json({msg: "Password succesfully changed"});

  }).catch(e => {
    console.log(e);
    res.status(500).send('Server Error: ' + e);
  })

}