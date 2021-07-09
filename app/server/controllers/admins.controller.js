const Admin = require("../models/admins")

exports.adminList = function (req, res)
{
    Admin.findAll().then(function (admins) {
        res.send(admins);
    }).catch(function (err) {
        res.send("error");
    });
}

exports.adminCreate = function (req, res) 
{
    Admin.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        adminRole: req.body.adminRole,
    }).then((admin) => {
        console.log(admin.get({ plain: true }));
        res.send(admin.get({ plain: true }));
    }).catch(err => {
        res.send('Error');
        console.log(err)
    })
}