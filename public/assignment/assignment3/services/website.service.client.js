user.service.client.jsuser.service.client.js/**
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
            websites.add(website)
        }

        function findWebsitesByUser(user) {
            var sites = [];
            for (var w in websites) {
                var _site = websites[w];
                if (_site.developerId === user._id) {
                    sites.add(_site);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                var _site = websites[w];
                if (_site.developerId === websiteId) {
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
            websites.remove(site);

        }

        return {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsitesById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }
    }
})();