/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("pageService", pageService);

    function pageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var id = 0;
            for (var i = 0; i < page.name.length; i++) {
                var char = page.name.charCodeAt(i);
                id = ((id << 5) - id) + char;
                id |= 0;
            }
            page._id = id.toString();
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var _pages = [];
            for (var p in pages) {
                var _page = pages[p];
                if (_page.websiteId === websiteId) {
                    _pages.push(_page);
                }
            }
            return _pages;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                var _page = pages[p];
                if (_page._id === pageId) {
                    return _page;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            var _page = findPageById(pageId);
            _page.name = page.name;
            _page.title = page.title;
        }

        function deletePage(pageId) {
            var _page = findPageById(pageId);
            var index = pages.indexOf(_page);
            pages.splice(index, 1);
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