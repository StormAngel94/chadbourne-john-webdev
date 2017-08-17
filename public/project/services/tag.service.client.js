/**
 * Created by ember on 8/12/2017.
 */
(function () {
    angular
        .module("tagMovies")
        .factory("tagService", tagService);

    function tagService($http) {
        function searchTags(searchTerm) {
            return $http.get("/api/search/tag?searchTerm=" + searchTerm);
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

        function updateTag(tid, tag) {
            return $http.put("/api/tag/" + tid, tag);
        }

        function findTagById(tid) {
            return $http.get("/api/tag/searchTag/" + tid);
        }

        function addFav(tid) {
            return $http.put("/api/tag/addFav/" + tid);
        }


        function removeFav(tid) {
            return $http.put("/api/tag/removeFav/" + tid);
        }

        function findAllTags() {
            var url = "/api/tag/all";
            return $http.get(url);
        }

        function removeMovie(tid, mid) {
            var url = "/api/tag/" + tid + "/removeMovie/" + mid;
            return $http.put(url);
        }

        function deleteTag(tid) {
            var url = "/api/tag/deleteTag/" + tid;
            return $http.delete(url);
        }

        return {
            "searchTags": searchTags,
            "findTag": findTag,
            "createTag": createTag,
            "addMovie": addMovie,
            "updateTag": updateTag,
            "findTagById": findTagById,
            "addFav": addFav,
            "removeFav": removeFav,
            "findAllTags": findAllTags,
            "removeMovie": removeMovie,
            "deleteTag": deleteTag
        }
    }
})();