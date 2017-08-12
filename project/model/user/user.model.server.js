/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");

var userModel = mongoose.model("userModel", userSchema);

userModel.createUser = createUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

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

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function updateUser(uid, user) {
    return userModel.update({_id: uid}, {$set: {
        username:       user.username,
        password:       user.password,
        firstName:      user.firstName,
        lastName:       user.lastName,
        email:          user.email,
    }})
}

function deleteUser(id) {
    return userModel.remove({_id: id}, function (err) {
        if(err) handleError(err);
    });
}