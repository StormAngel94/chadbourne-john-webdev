/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("pageService", pageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function createPage(websiteId, page) {
        page.websiteId = websiteId;
        pages.concat(page);
    }

    function findPagesByWebsiteId(websiteId) {
        var _pages = [];
        for (var p in pages) {
            var _page = pages[p];
            if (_page.websiteId === websiteId) {
                _pages.add(_page);
            }
        }
        return _pages;
    }

    function findPageById(pageId) {
        for (var p in pages) {
            var _page = pages[p];
            if (_page._id === _id) {
                return _page;
            }
        }
        return null;
    }

    function updatePage(pageId, page) {
        var _page = findPageById(pageId);
        _page.name = page.name;
        _page.description = page.description;
    }

    function deletePage(pageId) {
        var _page = findPageById(pageId);
        pages.remove(_page);
    }

    return {
        "createPage": createPage,
        "findPagesByWebsiteId": findPagesByWebsiteId,
        "findPageById": findPageById,
        "updatePage": updatePage,
        "deletePage": deletePage
    }

})();