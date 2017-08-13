/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("detailsController", detailsController);
    
    function detailsController($routeParams, user, movieService) {
        var vm = this;
        vm.user = user;

        function init() {
            vm.mid = $routeParams["mid"];
            movieService.getMovie(vm.mid)
                .then(function (response) {
                    vm.movie = response.data;
                    movieService.findMovie(vm.mid)
                        .then(function (response) {
                            if(response.data === null) {
                                movieService.createMovie(vm.mid)
                                    .then(function (response) {
                                        vm.movie = response.data;
                                        vm.tags = vm.movie.tags;
                                    })
                            } else {
                                vm.tags = response.data.tags;
                                vm.movie.favs = response.data.favs
                            }
                        })
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
        vm.goToTag = goToTag;
        vm.favorite = favorite;

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

        function goToTag() {
            $location.url("/search/go/tag/:tid")
        }

        function logout() {
            $location.url("/login")
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

        function favorite() {
            var mid = vm.movie.id;
            if(vm.user.movies && vm.user.movies.contains(mid)) {
                movieService.removeFav(mid);
                userService.removeMovie(mid);
            } else {
                movieService.addFav(mid);
                userService.addMovie(mid);
            }
        }
    }
})();