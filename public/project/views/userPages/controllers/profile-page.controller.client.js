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
                    for(var m in vm.other.movies) {
                        var mid =  vm.other.movies[m];
                        movieService.findMovie(mid)
                            .then(function (resp) {
                                vm.movies.push(resp.data);
                            })
                    }
                    for(var t in vm.other.tags) {
                        var tid =  vm.other.tags[t];
                        tagService.findTagById(tid)
                            .then(function (resp) {
                                vm.tags.push(resp.data);
                            })
                    }
                    for(var u in vm.other.users) {
                        var uid =  vm.other.users[u];
                        userService.findUserByIdSafe(uid)
                            .then(function (resp) {
                                vm.users.push(resp.data);
                            })
                    }
                })
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
            $location.url("/login")
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