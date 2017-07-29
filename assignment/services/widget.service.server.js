/**
 * Created by ember on 7/22/2017.
 */
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

module.exports = function () {
    var app = require("../../express");

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
};

function createWidget(req, res) {
    var widget = req.body;
    var id = 0;
    for (var i = 0; i < widget.widgetType.length; i++) {
        var char = widget.widgetType.charCodeAt(i);
        id = ((id << 5) - id) + char;
        id |= 0;
        id = id * widget.pageId;
    }
    widget._id = id.toString();
    widgets.push(widget);
    res.send(widget)
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pid;
    var _widgets = [];
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget.pageId === pageId) {
            _widgets.push(_widget);
        }
    }
    res.send(_widgets);
}

function findWidgetById(req, res) {
    var widgetId = req.params.wgid;
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget._id === widgetId) {
            res.send(_widget);
            return;
        }
    }
}

function searchWidgetById(widgetId) {
    for (var w in widgets) {
        var _widget = widgets[w];
        if (_widget._id === widgetId) {
            return _widget;
        }
    }
    return null;

}

function updateWidget(req, res) {
    var _widget = searchWidgetById(req.params.wgid);
    var widget = req.body;
    _widget.name = widget.name;
    _widget.text = widget.text;
    _widget.size = widget.size;
    _widget.url = widget.url;
    _widget.width = widget.width;

    res.send("0");
}

function deleteWidget(req, res) {
    var widget = searchWidgetById(req.params.wgid);
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.send(widget);
}