/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .factory("tagService", tagService);

    function tagService($http) {
        function searchTags(searchTerm) {
            return $http.get("/api/search/user/" + searchTerm);
        }

        return {
            "searchTags": searchTags
        }
    }
})();