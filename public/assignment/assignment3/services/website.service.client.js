/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("websiteService", websiteService);

    function websiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        function createWebsite(userID, website) {
            website.developerId = userID;
            var id = 0;
            for (var i = 0; i < website.name.length; i++) {
                var char = website.name.charCodeAt(i);
                id = ((id << 5) - id) + char;
                id |= 0;
            }
            website._id = id.toString();
            websites.push(website)
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for (var w in websites) {
                var _site = websites[w];
                if (_site.developerId === userId) {
                    sites.push(_site);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                var _site = websites[w];
                if (_site._id === websiteId) {
                    return _site;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            var site = findWebsiteById(websiteId);
            site.name = website.name;
            site.description = website.description;

        }

        function deleteWebsite(websiteId) {
            var site = findWebsiteById(websiteId);
            var index = websites.indexOf(site);
            websites.splice(index, 1);
        }

        return {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }
    }
})();