/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, $location, user, movieService, userService, tagService) {
        var vm = this;
        vm.user = user;
        vm.tags = [];

        function init() {
            vm.mid = $routeParams["mid"];
            movieService.getMovie(vm.mid)
                .then(function (response) {
                    vm.movie = response.data;
                });
            movieService.findMovie(vm.mid)
                .then(function (response) {
                    vm.tagMovie = response.data;
                    if(vm.tagMovie !== null) {
                        movieService.getAllTags(vm.mid)
                            .then(function (response) {
                                vm.tags = response.data;
                            })
                        }
                    else {
                        vm.noMovie = true;
                        vm.tagMovie = {};
                        vm.tagMovie.favs = 0;
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
        vm.addTag = addTag;

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

        function logout() {
            userService.logout()
                .then(function (response) {
                    $location.url("/");
                })
        }

        function goSearch(criteria) {
            $location.url("/search/" + criteria.searchType + "/" + criteria.searchText)
        }

        function favorite() {
            if(vm.noMovie) {
                movieService.createMovie(vm.mid, vm.movie.title)
                    .then(function (response) {
                        vm.tagMovie = response.data;
                    })
            }
            var mid = vm.movie.id;
            var uid = vm.user._id;
            if(vm.user.movies && contains(vm.user.movies, mid)) {
                movieService.removeFav(mid);
                userService.removeMovie(uid, mid);
            } else {
                movieService.addFav(mid);
                userService.addMovie(uid, mid);
            }
            location.reload();
        }

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function addTag(newTag) {
            if(vm.noMovie) {
                movieService.createMovie(vm.mid, vm.movie.title)
                    .then(function (response) {
                        vm.tagMovie = response.data;
                    })
            }
            if(newTag) {
                tagService.findTag(newTag)
                    .then(function (response) {
                        var tag = response.data;
                        if(tag === null) {
                            tagService.createTag(newTag);
                            tagService.findTag(newTag)
                                .then(function (response) {
                                    tag = response.data;
                                    movieService.addTag(newTag);
                                    tagService.addMovie(tag._id, newTag);
                                    location.reload();
                                })
                        } else {
                            movieService.addTag(vm.tagMovie.tmdbId, newTag);
                            tagService.addMovie(tag._id, vm.tagMovie.tmdbId);
                            location.reload();
                        }
                    })
            }

        }
    }
})();

