/**
 * Created by ember on 7/28/2017.
 */
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = function () {
    var app = require("../../express");

    app.get("/api/user", nameTaken);
    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
    app.get("/api/checkLogin", checkLogin);
};

function nameTaken(req, res) {
    var username = req.query.username;
    userModel.findOne({username: username})
        .then(function (response) {
            res.json(response);
        })
}

function createUser(req, res) {
    var user = req.body;
    res.json(userModel.createUser(user));
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function localStrategy(username, password, done) {
    userModel.findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}