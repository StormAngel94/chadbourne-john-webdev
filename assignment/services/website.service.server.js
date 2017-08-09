/**
 * Created by ember on 7/22/2017.
 */
var websiteModel = require("../model/website/website.model.server");

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
    var uid = req.params.uid;
    res.json(websiteModel.createWebsiteForUser(uid, website));
}

function findWebsitesByUser(req, res) {
    var userId = req.params.uid;
        res.send(websiteModel.findAllWebsitesForUser(userId));
}

function findWebsiteById(req, res) {
    var id = req.params.wid;
    websiteModel.findWebsiteById(id)
        .then(function (response) {
            res.json(response);
        });
}

function updateWebsite(req, res) {
    var wid = req.params.uid;
    var website = req.body;
    websiteModel.updateWebsite(wid, website)
        .then(function (response) {
            res.json(response);
        });

}

function deleteWebsite(req, res) {
    var wid = req.params.wid;
    websiteModel.deleteWebsite(wid)
        .then(function (response) {
            res.json(response);
        });
}
