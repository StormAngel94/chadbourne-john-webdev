/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("detailsController", detailsController);
    
    function detailsController($routeParams, movieService) {
        var vm = this;

        function init() {
            vm.mid = $routeParams["mid"];
            var promise = movieService.getMovie(vm.mid);
            promise
                .then(function (response) {
                        vm.movie = response.data;
                        console.log(vm.movie)
                    }
                )
        }
        init();

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
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }
    }
})();