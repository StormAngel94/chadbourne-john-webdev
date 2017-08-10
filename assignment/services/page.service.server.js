/**
 * Created by ember on 7/22/2017.
 */
var pageModel = require("../model/page/page.model.server");

module.exports = function () {
    var app = require("../../express");

    app.post("/api/website/:wid/page", createPage);
    app.get("/api/website/:wid/page", findPagesByWebsiteId);
    app.get("/api/page/:pid", findPageById);
    app.put("/api/page/:pid", updatePage);
    app.delete("/api/page/:pid", deletePage);
};

function createPage(req, res) {
    var page = req.body;
    var uid = req.params.uid;
    res.json(pageModel.createPage(uid, page));
}

function findPagesByWebsiteId(req, res) {
    var wid = req.params.wid;
    pageModel.findAllPagesForWebsite(wid)
        .then(function(websites) {
            res.json(websites)
        });
}

function findPageById(req, res) {
    var pid = req.params.pid;
    pageModel.findPageById(pid)
        .then(function (response) {
            res.json(response);
        });
}

function updatePage(req, res) {
    var wid = req.params.pid;
    var page = req.body;
    pageModel.updatePage(wid, page)
        .then(function (response) {
            res.json(response);
        });

}

function deletePage(req, res) {
    var wid = req.params.wid;
    pageModel.deletePage(wid)
        .then(function (response) {
            res.json(response);
        });
}
