/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("profileController", profileController);

    function profileController($location, $routeParams, userService, movieService, tagService, user) {
        var vm = this;
        vm.user = user;
        vm.otherId = $routeParams["uid"];
        vm.movies = [];
        vm.tags = [];
        vm.users = [];
        function init() {
            userService.findUserById(vm.otherId)
                .then(function (response) {
                    vm.other = response.data;
                    userService.getAllTags(vm.otherId)
                        .then(function (response) {
                            vm.tags = response.data;
                            userService.getAllMovies(vm.otherId)
                                .then(function (response) {
                                    vm.movies = response.data;
                                    userService.getAllUsers(vm.otherId)
                                        .then(function (response) {
                                            vm.users = response.data;
                                        })
                                });
                        });
                });
        }
        init();

        vm.updateCurr = updateCurr;
        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goToMovie = goToMovie;
        vm.goSearch = goSearch;
        vm.logout = logout;
        vm.goToTag = goToTag;
        vm.goToUser = goToUser;
        vm.follow = follow;

        function updateCurr(user) {
            userService.updateUser(user._id, user);
            vm.updateMessage = "Update Successful!"
        }

        function goToLogin() {
            $location.url("/login")
        }

        function goToRegister() {
            $location.url("/register")
        }

        function goToAccount() {
            $location.url("/profile")
        }

        function goToAdmin() {
            $location.url("/ADMIN/base")
        }

        function goToMovie(movie) {
            $location.url("/search/go/movie/" + movie.tmdbId);
        }

        function goToTag(tag) {
            $location.url("/search/go/tag/" + tag._id);
        }

        function goToUser(user) {
            $location.url("/search/go/user/" + user._id);
        }

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/");
                })
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

        function follow() {
            var oid = vm.otherId;
            var uid = vm.user._id;
            if(vm.user.users && contains(vm.user.users, oid) && uid !== oid) {
                userService.unfollow(uid, oid);
            } else {
                userService.follow(uid, oid);
            }
            location.reload()
        }

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

    }
})();