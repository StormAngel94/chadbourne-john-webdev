/**
 * Created by ember on 7/22/2017.
 */
var widgetModel = require('../model/widget/widget.model.server');

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
    var pid = req.params.pid;
    res.json(widgetModel.createWidget(pid, widget));
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pid;
    widgetModel.findAllWidgetsForPage(pageId)
        .then(function(websites) {
            res.json(websites)
        });
}

function findWidgetById(req, res) {
    var wgid = req.params.wgid;
    widgetModel.findWidgetById(wgid)
        .then(function (response) {
            res.json(response);
        });
}

function updateWidget(req, res) {
    var wgid = req.params.wgid;
    var widget = req.body;
    widgetModel.updateWidget(wgid, widget)
        .then(function (response) {
            res.json(response);
        });

}

function deleteWidget(req, res) {
    var wid = req.params.wid;
    widgetModel.deleteWidget(wid)
        .then(function (response) {
            res.json(response);
        });
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

function uploadFile(req, res) {
    var myFile = req.file;

    var widgetId = req.body.widgetId;
    var uid = req.body.userId;
    var wid = req.body.websiteId;
    var pid = req.body.widgetId;

    var origname = myFile.name;
    var filename      = myFile.filename;
    var width         = myFile.width;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = widgetModel.findById(widgetId);
    widget.url = '/uploads/' + filename;
    widget.width = width;
    var callbackUrl   = "/assignment/assignment4/index.html#!   /user/" + uid + "/website/" + wid + "/page/" + pid + "/widget";
    res.redirect(callbackUrl);
}