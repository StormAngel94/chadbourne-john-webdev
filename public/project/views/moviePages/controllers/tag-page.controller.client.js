/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("tagController", tagController);
    
    function tagController($routeParams, $location, user, userService, tagService, movieService) {
        var vm = this;
        vm.tid = $routeParams["tid"];
        vm.user = user;
        vm.movies = [];

        function init() {
            tagService.findTagById(vm.tid)
                .then(function (response) {
                    vm.tag = response.data;
                    for(var t in vm.tag.movies) {
                        var mid =  vm.tag.movies[t];
                        movieService.findMovie(mid)
                            .then(function (resp) {
                                vm.movies.push(resp.data);
                            })
                    }
                    })
        }
        init();

        vm.goToLogin = goToLogin;
        vm.goToRegister = goToRegister;
        vm.goToAccount = goToAccount;
        vm.goToAdmin = goToAdmin;
        vm.goToMovie = goToMovie;
        vm.goSearch = goSearch;
        vm.logout = logout;
        vm.goToTag = goToTag;
        vm.favorite = favorite;
        vm.editTag = editTag;

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

        function goToTag(tid) {
            $location.url("/search/go/tag/" + tid)
        }

        function goToMovie(movie) {
            $location.url("/search/go/movie/" + movie.tmdbId);
        }

        function logout() {
            $location.url("/login")
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

        function favorite() {
            var tid = vm.tid;
            var uid = vm.user._id;
            if(vm.user.tags && contains(vm.user.tags, tid)) {
                tagService.removeFav(tid);
                userService.removeTag(uid, tid);
            } else {
                tagService.addFav(tid);
                userService.addTag(uid, tid);
            }
            location.reload()
        }

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function editTag() {
            $location.url("/search/go/tag/" + vm.tid + "/edit");
        }
    }
})();