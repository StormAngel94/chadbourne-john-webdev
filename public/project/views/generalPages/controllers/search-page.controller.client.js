/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("searchController", searchController);
    
    function searchController($location, $routeParams, user, movieService, tagService, userService) {
        var vm = this;
        vm.search = {};
        vm.user = user;
        vm.search.searchType = $routeParams['type'];
        vm.search.searchText = $routeParams["search"];

        function init() {
            goSearch(vm.search);
        }
        init();

        vm.goSearch = goSearch;
        vm.goToMovie = goToMovie;
        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goSearch = goSearch;
        vm.logout = logout;
        vm.goToTag = goToTag;
        vm.goToUser = goToUser;

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

        function logout() {
            $location.url("/login")
        }

        function goSearch(criteria) {
            if(criteria.searchType === "movie") {
                movieService
                    .searchMovies(criteria.searchText)
                    .then(function (response) {
                        vm.movies = response.data.results;
                        vm.users = false;
                        vm.tags = false;
                });
            }

            else if(criteria.searchType === "tag") {
                tagService
                    .searchTags(criteria.searchText)
                    .then(function (response) {
                        vm.tags = response.data;
                        vm.users = false;
                        vm.movies = false;
                });
            }

            else if(criteria.searchType === "user") {
                userService
                    .searchUsers(criteria.searchText)
                    .then(function (response) {
                        vm.users = response.data;
                        vm.movies = false;
                        vm.tags = false;
                    });
            }
        }

        function goToMovie(movie) {
            $location.url("/search/go/movie/" + movie.id);
        }

        function goToTag(tag) {
            $location.url("/search/go/tag/" + tag._id);
        }

        function goToUser(user) {
            $location.url("/search/go/user/" + user._id);
        }
    }
})();