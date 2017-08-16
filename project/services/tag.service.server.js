/**
 * Created by ember on 8/12/2017.
 */
var tagModel= require("../model/tag/tag.model.server");
module.exports = function () {
    var app = require("../../express");

    app.get("/api/tag/searchTag", searchTagByName);
    app.get("/api/search/tag/:tag", searchTags);
    app.post("/api/tag/createTag", createTag);
    app.put("/api/tag/:tid/movie/:movie", addMovie);
};

function searchTagByName(req, res) {
    tagModel.searchTagByName(req.query.tagName)
        .then(function (response) {
            res.json(response);
        })
}

function searchTags(req, res) {
    tagModel.searchTags(req.params.tag)
        .then(function (response) {
            res.json(response.data);
        })
}

function createTag(req, res) {
    tagModel.createTag(req.query.tagName)
        .then(function (response) {
            res.json(response.data);
        })
}

function addMovie(req, res) {
    var tid = req.params.tid;
    var movie = req.params.movie;
    tagModel.addMovie(tid, movie)
        .then(function (response) {
            res.json(response.data);
        })
}