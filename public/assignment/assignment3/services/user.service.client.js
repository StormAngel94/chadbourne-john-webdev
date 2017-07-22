/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("userService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        function createUser(user) {
            users.add(user)
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

        function findUserByUsername(username) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username) {
                    return _user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    return _user;
                }
            }
            return null;
        }

        function updateUser(id, username, password, firstName, lastName) {
            var _user = findUserById(id);
            _user.username = username;
            _user.password = password;
            _user.firstName = firstName;
            _user.lastName = lastName;
        }

        function deleteUser(id) {
            var _user = findUserById(id);
            users.remove(_user);
        }

        return {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        }
    }
})();