/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("accountController", accountController);

    function accountController($location, userService, movieService, tagService, user) {
        var vm = this;
        vm.user = user;
        vm.movies = [];
        vm.tags = [];
        vm.users = [];
        function init() {
            userService.getAllTags(vm.user._id)
                .then(function (response) {
                    vm.tags = response.data;
                    userService.getAllMovies(vm.user._id)
                        .then(function (response) {
                            vm.movies = response.data;
                            userService.getAllUsers(vm.user._id)
                                .then(function (response) {
                                    vm.users = response.data;
                                })
                        });
                });
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
            $location.url("/search/go/movie/" + movie.tmdbId);
        }

        function goToTag(tag) {
            $location.url("/search/go/tag/" + tag._id);
        }

        function goToUser(user) {
            $location.url("/search/go/user/" + user._id);
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