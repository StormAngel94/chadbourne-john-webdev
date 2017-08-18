/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("homeController", homeController);

    function homeController($location, user, userService, movieService, tagService) {
        var vm = this;
        vm.user = user;
        vm.tags = [];
        vm.movies = [];
        function init() {
            userService.getAllTags(vm.user._id)
                .then(function (response) {
                    vm.tags = response.data;
                    userService.getAllMovies(vm.user._id)
                        .then(function (response) {
                            vm.movies = response.data;
                        });
                });
        }
        if(vm.user) {
            init()
        }

        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goToMovie = goToMovie;
        vm.goToTag = goToTag;
        vm.goSearch = goSearch;
        vm.logout = logout;

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

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/");
                })
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }
    }
})();