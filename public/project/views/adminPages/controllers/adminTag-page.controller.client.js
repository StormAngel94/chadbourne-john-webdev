/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("adminTagController", adminTagController);

    function adminTagController($location, $routeParams, userService, movieService, tagService, user) {
        var vm = this;
        vm.user = user;
        vm.tid = $routeParams["tid"];
        vm.movies = [];
        function init() {
            tagService.findTagById(vm.tid)
                .then(function (response) {
                    vm.tag = response.data;
                    for(var m in vm.tag.movies) {
                        var mid =  vm.tag.movies[m];
                        movieService.findMovie(mid)
                            .then(function (resp) {
                                vm.movies.push(resp.data);
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
            tagService.removeMovie(vm.tag._id, movie.tmdbId)
                .then(function () {
                    movieService.removeTag(movie.tmdbId, vm.tag.name)
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

        function submit(tag) {
            tagService.updateTag(vm.tid, tag);
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