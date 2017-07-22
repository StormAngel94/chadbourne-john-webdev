/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("websiteService", websiteService);

    function websiteService() {
        var websites = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        function createWidget(userID, website) {
            website.developerId = userID;
            websites.concat(website)
        }

        function findWidgetsByPageId(pageId) {
            var sites = [];
            for (var w in websites) {
                var _site = websites[w];
                if (_site.developerId === pageId) {
                    sites.add(_site);
                }
            }
            return sites;
        }

        function findWidgetById(widgetId) {
            for (var w in websites) {
                var _site = websites[w];
                if (_site.developerId === widgetId) {
                    return _site;
                }
            }
            return null;

        }

        function updateWidget(widgetId, widget) {
            var site = findWebsiteById(widgetId);
            site.name = widget.name;
            site.description = widget.description;

        }

        function deleteWidget(widgetId) {
            var site = findWebsiteById(widgetId);
            websites.remove(site);

        }

        return {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        }
    }
})();