/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("adminUserController", adminUserController);

    function adminUserController($location, $routeParams, userService, movieService, tagService, user) {
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
        vm.submit = submit;
        vm.cancel = cancel;
        vm.delete = doDelete;

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
            userService.removeMovie(vm.otherId, movie.tmdbId)
                .then(function () {
                    movieService.removeFav(movie.tmdbId)
                        .then(function () {
                            return location.reload();
                        });
            })
        }

        function goToTag(tag) {
            userService.removeTag(vm.other._id, tag._id)
                .then(function () {
                    tagService.removeFav(tag._id)
                        .then(function () {
                            return location.reload();
                        });
                })
        }

        function goToUser(user) {
            userService.unfollow(vm.other._id, user._id)
                .then(function (response) {
                    return location.reload();
                })
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

        function submit(other) {
            userService.updateUser(vm.otherId, other);
            vm.updateMessage = "Update Successful!"
        }

        function cancel() {
            $location.url("/ADMIN/base");
        }

        function doDelete() {
            tagService.deleteTag(vm.tid);
            $location.url("/ADMIN/base");
        }
    }
})();