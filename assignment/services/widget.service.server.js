/**
 * Created by ember on 7/22/2017.
 */
module.exports = function () {
    var app = require("../../express");
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pid/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadFile);
    app.get("/api/page/:pid/widget", findWidgetsByPageId);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.put("/page/:pageId/widget", moveWidget);
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

function moveWidget(req, res) {
    var from = req.query.initial;
    var to = req.query.final;
    var widget = widgets[from];
    console.log(widget);
    widgets.splice(from, 1);
    widgets.splice(to, 0, widget);
    console.log(widgets[to]);
    res.send("0")
}

function deleteWidget(req, res) {
    var widget = searchWidgetById(req.params.wgid);
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.send(widget);
}

function uploadFile(req, res) {
    var myFile = req.file;

    var widgetId = req.body.widgetId;
    var uid = req.body.userId;
    var wid = req.body.websiteId;
    var pid = req.body.pageId;

    var origname = myFile.name;
    var filename      = myFile.filename;
    var width         = myFile.width;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = searchWidgetById(widgetId);
    widget.url = '/uploads/' + filename;
    widget.width = width;
    var callbackUrl   = "/assignment/assignment4/index.html#!   /user/" + uid + "/website/" + wid + "/page/" + pid + "/widget";
    res.redirect(callbackUrl);
}