/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("userService", userService);

    function userService($http) {
        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url, id);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/" + userId, user);
        }

        function deleteUser(id) {
            return $http.delete("/api/user/" + id);
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