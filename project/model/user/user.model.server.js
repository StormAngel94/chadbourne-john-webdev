/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var movieModel = require("../movie/movie.model.server");

var userModel = mongoose.model("userModel", userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findUserByIdSafe = findUserByIdSafe;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.searchUsers = searchUsers;
userModel.addMovie = addMovie;
userModel.removeMovie = removeMovie;
userModel.addTag = addTag;
userModel.removeTag = removeTag;
userModel.follow = follow;
userModel.unfollow = unfollow;

module.exports = userModel;

function createUser(user) {
    var search;
    userModel.findOne({username: user.username})
            .then(function (response) {
                search = response;
                if(search !== null) {
                    return "1";
                }
                var _user = new userModel(user);
                _user.save(function (err, user) {
                    if (err) return console.error(err);
                    return user
                });
                return  _user;
            });
}

function findUserByUsername(username) {
    return userModel.findOne({username: username})
}

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByIdSafe(id) {
    return userModel.findOne({_id:id}, {username:1});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(uid, user) {
    return userModel.update({_id: uid}, {$set: {
        username:       user.username,
        password:       user.password,
        firstName:      user.firstName,
        lastName:       user.lastName,
        email:          user.email
    }})
}

function deleteUser(id) {
    return userModel.remove({_id: id}, function (err) {
        if(err) handleError(err);
    });
}

function searchUsers(user) {
    var searchTerm = '.*' + user + '.*';
    return userModel.find({username: {$regex : searchTerm}})
}

function addMovie(uid, mid) {
    return userModel.update({_id: uid}, {$push: {
        movies: mid
    }})
}

function removeMovie(uid, mid) {
    return userModel.update({_id: uid}, {$pull: {
        movies: mid
    }})
}

function addTag(uid, mid) {
    return userModel.update({_id: uid}, {$push: {
        tags: mid
    }})
}

function removeTag(uid, mid) {
    return userModel.update({_id: uid}, {$pull: {
        tags: mid
    }})
}

function follow(uid, oid) {
    return userModel.update({_id: uid}, {$push: {
        users: oid
    }})
}

function unfollow(uid, oid) {
    return userModel.update({_id: uid}, {$pull: {
        users: oid
    }})
}