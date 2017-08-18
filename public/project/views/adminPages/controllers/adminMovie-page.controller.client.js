/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("adminMovieController", adminMovieController);

    function adminMovieController($location, $routeParams, userService, movieService, tagService, user) {
        var vm = this;
        vm.user = user;
        vm.mid = $routeParams["mid"];
        vm.tags = [];
        function init() {
            movieService.findMovie(vm.mid)
                .then(function (response) {
                    vm.movie = response.data;
                    for(var t in vm.movie.tags) {
                        var tid = vm.movie.tags[t];
                        tagService.findTag(tid)
                            .then(function (resp) {
                                vm.tags.push(resp.data);
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
            movieService.removeTag(vm.movie.tmdbId, tag.name)
                .then(function () {
                    tagService.removeMovie(tag._id, vm.movie.tmdbId)
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
            $location.url("/login")
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

        function submit(tag) {
            movieService.updateMovie(vm.mid, vm.movie);
            vm.updateMessage = "Update Successful!"
        }

        function cancel() {
            $location.url("/ADMIN/base");
        }

        function doDelete() {
            movieService.deleteMovie(vm.mid);
            $location.url("/ADMIN/base");
        }
    }
})();