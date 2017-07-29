/**
 * Created by ember on 7/22/2017.
 */
var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

module.exports = function () {
    var app = require("../../express");

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesByUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);
};

function createWebsite(req, res) {
    var website = req.body;
    var id = 0;
    for (var i = 0; i < website.name.length; i++) {
        var char = website.name.charCodeAt(i);
        id = ((id << 5) - id) + char;
        id |= 0;
    }
    website._id = id.toString();
    websites.push(website);
    res.send("0")
}

function findWebsitesByUser(req, res) {
    var userId = req.params.uid;
    var sites = [];
    for (var w in websites) {
        var _site = websites[w];
        if (_site.developerId === userId) {
            sites.push(_site);
        }
    }
    res.send(sites);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.wid;
    for (var w in websites) {
        var _site = websites[w];
        if (_site._id === websiteId) {
            res.send(_site);
            return;
        }
    }
    res.send("0");
}

function searchWebsiteById(websiteId) {
    for (var w in websites) {
        var _site = websites[w];
        if (_site._id === websiteId) {
            return _site;
        }
    }
    return null;
}

function updateWebsite(req, res) {
    var site = searchWebsiteById(req.params.wid);
    var website = req.body;
    site.name = website.name;
    site.description = website.description;
    res.send("0");

}

function deleteWebsite(req, res) {
    var site = searchWebsiteById(req.params.wid);
    var index = websites.indexOf(site);
    websites.splice(index, 1);
    res.send("0");
}
