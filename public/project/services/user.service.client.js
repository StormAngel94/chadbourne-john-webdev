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

        function findUserByIdSafe(id) {
            var url = "/api/user/safe/" + id;
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
            return $http.put("/api/user/" + uid + "/addMovie/" + mid);
        }

        function removeMovie(uid, mid) {
            return $http.put("/api/user/" + uid + "/removeMovie/" + mid);
        }

        function addTag(uid, tid) {
            return $http.put("/api/user/" + uid + "/addTag/" + tid);
        }

        function removeTag(uid, tid) {
            return $http.put("/api/user/" + uid + "/removeTag/" + tid);
        }

        function follow(uid, oid) {
            return $http.put("/api/user/" + uid + "/follow/" + oid);
        }

        function unfollow(uid, oid) {
            return $http.put("/api/user/" + uid + "/unfollow/" + oid);
        }

        function findAllUsers() {
            var url = "/api/user/all/all";
            return $http.get(url);
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url);
        }

        return {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByIdSafe": findUserByIdSafe,
            "nameTaken": nameTaken,
            "login": login,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLogin": checkLogin,
            "searchUsers": searchUsers,
            "addMovie": addMovie,
            "removeMovie": removeMovie,
            "addTag": addTag,
            "removeTag": removeTag,
            "follow": follow,
            "unfollow": unfollow,
            "findAllUsers": findAllUsers,
            "logout": logout
        }
    }
})();