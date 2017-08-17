/**
 * Created by ember on 8/12/2017.
 */
var tagModel= require("../model/tag/tag.model.server");
module.exports = function () {
    var app = require("../../express");

    app.get("/api/tag/searchTag", searchTagByName);
    app.get("/api/tag/all", findAllTags);
    app.get("/api/tag/searchTag/:tid", searchTagById);
    app.get("/api/search/tag", searchTags);
    app.post("/api/tag/createTag", createTag);
    app.put("/api/tag/:tid/movie/:movie", addMovie);
    app.put("/api/tag/:tag", updateTag);
    app.put("/api/tag/addFav/:tag", addFav);
    app.put("/api/tag/removeFav/:tag", removeFav);
    app.put("/api/tag/:tid/removeMovie/:mid", removeMovie);
    app.delete("/api/tag/deleteTag/:tid", deleteTag);
};

function searchTagByName(req, res) {
    tagModel.searchTagByName(req.query.tagName)
        .then(function (response) {
            res.json(response);
        })
}

function searchTagById(req, res) {
    tagModel.searchTagById(req.params.tid)
        .then(function (response) {
            res.json(response)
        })
}

function searchTags(req, res) {
    tagModel.searchTags(req.query.searchTerm)
        .then(function (response) {
            res.json(response);
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

function updateTag(req, res) {
    var tid = req.params.tag;
    var tag = req.body;
    tagModel.updateTag(tid, tag)
        .then(function (response) {
            res.json(response.data);
        })
}

function addFav(req, res) {
    var tid = req.params.tag;
    tagModel.addFav(tid)
        .then(function (response) {
            res.json(response.data);
        })
}

function removeFav(req, res) {
    var tid = req.params.tag;
    tagModel.removeFav(tid)
        .then(function (response) {
            res.json(response.data);
        })
}

function findAllTags(req, res) {
    tagModel.findAllTags()
        .then(function (movie) {
            res.json(movie);
        })
}

function removeMovie(req, res) {
    var tid = req.params.tid;
    var mid = req.params.mid;
    tagModel.removeMovie(tid, mid)
        .then(function (movie) {
            res.json(movie);
        })
}

function deleteTag(req, res) {
    var tid = req.params.tid;
    tagModel.deleteTag(tid)
        .then(function (movie) {
            res.json(movie);
        })
}