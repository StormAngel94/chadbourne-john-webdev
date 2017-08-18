/**
 * Created by ember on 7/28/2017.
 */
var userModel = require("../model/user/user.model.server");
var movieModel = require("../model/movie/movie.model.server");
var tagModel = require("../model/tag/tag.model.server");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = function () {
    var app = require("../../express");

    app.get("/api/search/user/:user", searchUsers);
    app.get("/api/user", nameTaken);
    app.get("/api/user/:uid", findUserById);
    app.get("/api/user/all/all", findAllUsers);
    app.get("/api/user/safe/:uid", findUserByIdSafe);
    app.get("/api/user/getAll/tags/:uid", findTagsForUser);
    app.get("/api/user/getAll/movies/:uid", findMoviesForUser);
    app.get("/api/user/getAll/users/:uid", findUsersForUser);
    app.post("/api/user", createUser);
    app.put("/api/user/:uid/addMovie/:mid", addMovie);
    app.put("/api/user/:uid/removeMovie/:mid", removeMovie);
    app.put("/api/user/:uid/addTag/:tid", addTag);
    app.put("/api/user/:uid/removeTag/:tid", removeTag);
    app.put("/api/user/:uid/follow/:oid", follow);
    app.put("/api/user/:uid/unfollow/:oid", unfollow);
    app.post("/api/updateUser", updateUser);
    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
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
    var uid = req.body._id;
    var user = req.body.user;
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

function addMovie(req, res) {
    var uid = req.params.uid;
    var mid = req.params.mid;
    userModel.addMovie(uid, mid)
        .then(function (response) {
            res.json(response);
        });
}

function removeMovie(req, res) {
    var uid = req.params.uid;
    var mid = req.params.mid;
    userModel.removeMovie(uid, mid)
        .then(function (response) {
            res.json(response);
        });
}

function addTag(req, res) {
    var uid = req.params.uid;
    var tid = req.params.tid;
    userModel.addTag(uid, tid)
        .then(function (response) {
            res.json(response);
        });
}

function removeTag(req, res) {
    var uid = req.params.uid;
    var tid = req.params.tid;
    userModel.removeTag(uid, tid)
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

function searchUsers(req, res) {
    userModel.searchUsers(req.params.user)
        .then(function (response) {
            res.json(response);
        })
}

function findUserById(req, res) {
    var uid = req.params.uid;
    userModel.findUserById(uid)
        .then(function (response) {
            res.send(response);
        })
}

function findUserByIdSafe(req, res) {
    var uid = req.params.uid;
    userModel.findUserByIdSafe(uid)
        .then(function (response) {
            res.send(response);
        })
}

function follow(req, res) {
    var uid = req.params.uid;
    var oid = req.params.oid;
    userModel.follow(uid, oid)
        .then(function (response) {
            res.send(response);
        })
}

function unfollow(req, res) {
    var uid = req.params.uid;
    var oid = req.params.oid;
    userModel.unfollow(uid, oid)
        .then(function (response) {
            res.send(response);
        })
}

function findAllUsers(req, res) {
    userModel.findAllUsers()
        .then(function (resp) {
            res.json(resp);
        })
}

function logout(req, res) {
    req.logout();
    res.send("0");
}

function findMoviesForUser(req, res) {
    var uid = req.params.uid;
    var _movies= [];
    userModel.findUserById(uid)
        .then(function (response) {
            var movies = JSON.stringify(response.movies);
            movies = JSON.parse(movies);
            var promises = [];
            for(var m in movies) {
                var movie = movies[m];
                var promise = movieModel.findMovie(movie);
                promise
                    .then(function (response) {
                        _movies.push(response)
                    });
                promises.push(promise);
            }
            Promise.all(promises)
                .then(function (response) {
                    res.json(_movies);
                })
        })
}

function findTagsForUser(req, res) {
    var uid = req.params.uid;
    var _tags = [];
    userModel.findUserById(uid)
        .then(function (response) {
            var tags = JSON.stringify(response.tags);
            tags = JSON.parse(tags);
            var promises = [];
            for(var t in tags) {
                var tag = tags[t];
                var promise = tagModel.searchTagById(tag);
                promise
                    .then(function (response) {
                        _tags.push(response)
                    });
                promises.push(promise);
            }
            Promise.all(promises)
                .then(function (response) {
                    res.json(_tags);
                })
        })
}

function findUsersForUser(req, res) {
    var uid = req.params.uid;
    var _users = [];
    userModel.findUserById(uid)
        .then(function (response) {
            var users = JSON.stringify(response.users);
            users = JSON.parse(users);
            var promises = [];
            for(var u in users) {
                var user = users[u];
                var promise = userModel.findUserById(user);
                promise
                    .then(function (response) {
                        _users.push(response)
                    });
                promises.push(promise);
            }
            Promise.all(promises)
                .then(function (response) {
                    res.json(_users);
                })
        })
}