/**
 * Created by ember on 8/4/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .factory("movieService", movieService);

    function movieService($http) {
        var key = "53f856f34ff5b6efc67de7e14ac5617d";

        function searchMovies(searchTerm) {
            var urlBase = "https://api.themoviedb.org/3/search/movie?api_key=API_KEY&language=en-US&query=TEXT&include_adult=false";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function getMovie(id) {
            var urlBase = "https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=API_KEY&language=en-US";
            var url = urlBase.replace("MOVIE_ID", id).replace("API_KEY", key);
            return $http.get(url);

        }

        function findMovie(mid) {
            return $http.get("/api/movie/" + mid);
        }

        function createMovie(mid, title) {
            var url = "/api/movie/create/" + mid + "?title=" + title;
            return $http.post(url);
        }

        function addFav(mid) {
            var url = "/api/movie/addFav/" + mid;
            return $http.put(url);
        }

        function removeFav(mid) {
            var url = "/api/movie/removeFav/" + mid;
            return $http.put(url);
        }

        function addTag(mid, tag) {
            var url = "/api/movie/" + mid + "/addTag/" + tag;
            return $http.put(url);
        }

        function findAllMovies() {
            var url = "/api/movie/all/all";
            return $http.get(url);
        }


        function removeTag(mid, tid) {
            var url = "/api/movie/" + mid + "/removeTag/" + tid;
            return $http.put(url);
        }

        return {
            "searchMovies": searchMovies,
            "getMovie": getMovie,
            "findMovie": findMovie,
            "createMovie": createMovie,
            "addFav": addFav,
            "removeFav": removeFav,
            "addTag": addTag,
            "findAllMovies": findAllMovies,
            "removeTag": removeTag
        }
    }
})();