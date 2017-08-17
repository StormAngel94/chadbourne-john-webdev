/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("adminController", adminController);

    function adminController($location, userService, movieService, tagService, user) {
        var vm = this;
        vm.user = user;
        vm.movies = [];
        vm.tags = [];
        vm.users = [];
        function init() {
            movieService.findAllMovies()
                .then(function (movies) {
                    vm.movies = movies.data;
                });
            tagService.findAllTags()
                .then(function (tags) {
                    vm.tags = tags.data;
                });
            userService.findAllUsers()
                .then(function (users) {
                    vm.users = users.data;
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
            $location.url("/ADMIN/movie/" + movie.tmdbId);
        }

        function goToTag(tag) {
            $location.url("/ADMIN/tag/" + tag._id);
        }

        function goToUser(user) {
            $location.url("/ADMIN/user/" + user._id);
        }

        function logout() {
            $location.url("/login")
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

    }
})();