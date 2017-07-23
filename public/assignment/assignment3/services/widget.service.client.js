/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .factory("widgetService", widgetService);

    function widgetService() {
        var widgets = [
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

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            var id = 0;
            for (var i = 0; i < widget.widgetType.length; i++) {
                var char = widget.widgetType.charCodeAt(i);
                id = ((id << 5) - id) + char;
                id |= 0;
                id = id * pageId;
            }
            widget._id = id.toString();
            widgets.push(widget)
        }

        function findWidgetsByPageId(pageId) {
            var _widgets = [];
            for (var w in widgets) {
                var _widget = widgets[w];
                if (_widget.pageId === pageId) {
                    _widgets.push(_widget);
                }
            }
            return _widgets;
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                var _widget = widgets[w];
                if (_widget._id === widgetId) {
                    return _widget;
                }
            }
            return null;

        }

        function updateWidget(widgetId, widget) {
            var site = findWidgetById(widgetId);
            site.name = widget.name;
            site.description = widget.description;

        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);
            widgets.splice(index, 1);

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