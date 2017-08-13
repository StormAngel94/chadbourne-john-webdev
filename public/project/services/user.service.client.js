/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .factory("userService", userService);

    function userService($http) {
        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url, id);
        }

        function nameTaken(username) {
            return $http.get("/api/user?username=" + username);
        }

        function login(username, password) {
            return $http.post("/api/login", {username:username, password:password});
        }

        function updateUser(userId, user) {
            return $http.post("/api/updateUser/", {_id: userId, user: user});
        }

        function deleteUser(id) {
            return $http.delete("/api/user/" + id);
        }

        function checkLogin() {
            return $http.get("/api/checkLogin")
        }

        function searchUsers(searchTerm) {
            return $http.get("/api/search/user/" + searchTerm);
        }

        function addMovie(uid, mid) {
            return $http.post("/api/user/" + uid + "/addMovie/" + mid);
        }

        function removeMovie(uid, mid) {
            return $http.post("/api/user/" + uid + "/removeMovie/" + mid);
        }

        return {
            "createUser": createUser,
            "findUserById": findUserById,
            "nameTaken": nameTaken,
            "login": login,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin,
            "searchUsers": searchUsers,
            "addMovie": addMovie,
            "removeMovie": removeMovie
        }
    }
})();