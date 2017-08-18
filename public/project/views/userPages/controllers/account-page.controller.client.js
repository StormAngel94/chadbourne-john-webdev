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
            for(var u in vm.user.users) {
                var uid =  vm.user.users[u];
                userService.findUserByIdSafe(uid)
                    .then(function (resp) {
                        vm.users.push(resp.data);
                    })
            }
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