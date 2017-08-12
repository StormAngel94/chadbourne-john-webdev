/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("searchController", searchController);
    
    function searchController($location, $routeParams, movieService) {
        var vm = this;
        vm.search = {};
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
                });
            }

            else if(criteria.searchType === "tag") {
                //TODO
            }

            else if(criteria.searchType === "user") {
                //TODO
            }
        }

        function goToMovie(movie) {
            $location.url("/search/" + movie.id);
        }
    }
})();