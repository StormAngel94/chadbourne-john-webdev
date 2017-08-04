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
    }
})();