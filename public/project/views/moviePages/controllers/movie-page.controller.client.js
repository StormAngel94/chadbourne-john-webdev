/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("detailsController", detailsController);
    
    function detailsController($routeParams, $location, user, movieService, userService) {
        var vm = this;
        vm.user = user;

        function init() {
            vm.mid = $routeParams["mid"];
            movieService.getMovie(vm.mid)
                .then(function (response) {
                    vm.movie = response.data;
                });
            movieService.findMovie(vm.mid)
                .then(function (response) {
                    vm.tagMovie = response.data;
                    if(vm.tagMovie === null) {
                        movieService.createMovie(vm.mid);
                    }
                })
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
            var uid = vm.user._id;
            if(vm.user.movies && contains(vm.user.movies, mid)) {
                movieService.removeFav(mid);
                userService.removeMovie(uid, mid);
                vm.tagMovie.favs = vm.tagMovie.favs - 1;
            } else {
                movieService.addFav(mid);
                userService.addMovie(uid, mid);
                vm.tagMovie.favs = vm.tagMovie.favs + 1;
            }
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