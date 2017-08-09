/**
 * Created by ember on 7/28/2017.
 */
var userModel = require("../model/user/user.model.server");


module.exports = function () {
    var app = require("../../express");

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUser);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
};

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    var id = req.params.uid;

    if(username && password) {
        userModel.findUserByCredentials(username, password)
            .then(function (response) {
                res.json(response)
            });
        return;
    }

    else if (username) {
        userModel.findUserByUsername(username)
            .then(function (response) {
                res.json(response)
            });
        return;
    }

    else if (id) {
        userModel.findUserById(id)
            .then(function (response) {
                res.json(response);
            });
        return;
    }
    res.send("0");
}

function createUser(req, res) {
    var user = req.body;
    res.json(userModel.createUser(user));
}

function updateUser(req, res) {
    var uid = req.params.uid;
    var user = req.body;
    userModel.updateUser(uid, user)
        .then(function (response) {
            res.json(response);
        });
}

function deleteUser(req, res) {
    var uid = req.params.uid;
    userModel.deleteUser(uid)
        .then(function (response) {
            res.json(response);
        });
}