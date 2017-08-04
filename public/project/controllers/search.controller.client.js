/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .controller("searchController", searchController);
    
    function searchController($location, movieService) {
        var vm = this;

        vm.goSearch = goSearch;
        vm.goToMovie = goToMovie;

        function goSearch(criteria) {
            if(criteria.searchType === "movie") {
                movieService
                    .searchMovies(criteria.searchText)
                    .then(function (response) {
                        vm.movies = response.data.results;
                });
            }

            else if(criteria.searchType === "tag") {
                //TODO
            }
        }

        function goToMovie(movie) {
            $location.url("/search/" + movie.id);
        }
    }
})();