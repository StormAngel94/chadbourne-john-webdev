/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("pageService", pageService);

    function pageService($http) {
        function createPage(websiteId, page) {
            page._website = websiteId;
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page)
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url)
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url)
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page)
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url)
        }

        return {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }
    }
})();