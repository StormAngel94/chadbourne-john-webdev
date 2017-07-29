/**
 * Created by ember on 7/28/2017.
 */
var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

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
    var _user;
    var u;

    if(username && password) {
        for (u in users) {
            _user = users[u];
            if (_user.username === username && _user.password === password) {
                res.send(_user);
                return;
            }
        }
    }

    else if (username) {
        for (u in users) {
            _user = users[u];
            if (_user.username === username) {
                res.send(_user);
                return;
            }
        }
    }

    else if (id) {
        for (u in users) {
            _user = users[u];
            if (_user._id === id) {
                res.send(_user);
                return;
            }
        }
    }
    res.send("0");
}

function createUser(req, res) {
    var user = req.body;
    var id = 0;
    for (var i = 0; i < user.username.length; i++) {
        var char = user.username.charCodeAt(i);
        id = ((id << 5) - id) + char;
        id |= 0;
    }
    user._id = id.toString();
    users.push(user);
    res.send(user);
}

function findUserById(id) {
    for (var u in users) {
        var _user = users[u];
        if (_user._id === id) {
            return _user;
        }
    }
    return null;
}

function updateUser(req, res) {
    var _user = findUserById(req.params.uid);
    var user = req.body;
    _user.username = user.username;
    _user.password = user.password;
    _user.firstName = user.firstName;
    _user.lastName = user.lastName;
    res.send("0");
}

function deleteUser(req, res) {
    var _user = findUserById(req.params.uid);
    var index = users.indexOf(_user);
    users.splice(index, 1);
    res.send("0");
}