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

        function findTag(newTag) {
            return $http.get("/api/tag/searchTag?tagName=" + newTag);
        }

        function createTag(newTag) {
            return $http.post("/api/tag/createTag?tagName=" + newTag);
        }

        function addMovie(tid, movie) {
            return $http.put("/api/tag/" + tid + "/movie/" + movie);
        }

        return {
            "searchTags": searchTags,
            "findTag": findTag,
            "createTag": createTag,
            "addMovie": addMovie
        }
    }
})();