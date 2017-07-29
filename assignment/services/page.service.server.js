/**
 * Created by ember on 7/22/2017.
 */
var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

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
    var id = 0;
    for (var i = 0; i < page.name.length; i++) {
        var char = page.name.charCodeAt(i);
        id = ((id << 5) - id) + char;
        id |= 0;
    }
    page._id = id.toString();
    pages.push(page);
    res.send(page);
}

function findPagesByWebsiteId(req, res) {
    var websiteId = req.params.wid;
    var _pages = [];
    for (var p in pages) {
        var _page = pages[p];
        if (_page.websiteId === websiteId) {
            _pages.push(_page);
        }
    }
    res.send(_pages);
}

function findPageById(req, res) {
    var pageId = req.params.pid;
    for (var p in pages) {
        var _page = pages[p];
        if (_page._id === pageId) {
            res.send(_page);
            return;
        }
    }
    res.send("0");
}

function searchPageById(pageId) {
    for (var p in pages) {
        var _page = pages[p];
        if (_page._id === pageId) {
            return _page;
        }
    }
    return null;
}

function updatePage(req, res) {
    var pageId = req.params.pid;
    var page = req.body;
    var _page = searchPageById(pageId);
    _page.name = page.name;
    _page.description = page.description;
    res.send("0");
}

function deletePage(req, res) {
    var pageId = req.params.pid;
    var _page = searchPageById(pageId);
    var index = pages.indexOf(_page);
    pages.splice(index, 1);
    res.send("0");
}
