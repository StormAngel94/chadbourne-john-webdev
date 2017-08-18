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
            for(var m in vm.user.movies) {
                var mid =  vm.user.movies[m];
                movieService.findMovie(mid)
                    .then(function (resp) {
                        vm.movies.push(resp.data);
                    })
            }
            for(var t in vm.user.tags) {
                var tid =  vm.user.tags[t];
                tagService.findTagById(tid)
                    .then(function (resp) {
                        vm.tags.push(resp.data);
                    })
            }
        }
        if(vm.user) {
            init()
        }

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