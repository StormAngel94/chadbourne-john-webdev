/**
 * Created by ember on 8/12/2017.
 */
var tagModel= require("../model/tag/tag.model.server");
var movieModel= require("../model/movie/movie.model.server");

module.exports = function () {
    var app = require("../../express");

    app.get("/api/tag/searchTag", searchTagByName);
    app.get("/api/tag/all", findAllTags);
    app.get("/api/tag/searchTag/:tid", searchTagById);
    app.get("/api/search/tag", searchTags);
    app.get("/api/tag/getAll/:tid", getAllMoviesForTag);
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
    var tagName = req.query.tagName;
    tagModel.createTag(tagName);
    res.send("0");
}

function addMovie(req, res) {
    var tid = req.params.tid;
    var movie = req.params.movie;
    tagModel.addMovie(tid, movie)
        .then(function (response) {
            res.json(response.data);
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

function deleteTag(req, res) {
    var tid = req.params.tid;
    tagModel.deleteTag(tid)
        .then(function (movie) {
            res.json(movie);
        })
}

function getAllMoviesForTag(req, res) {
    var tid = req.params.tid;
    var _movies= [];
    tagModel.searchTagById(tid)
        .then(function (response) {
            var movies = JSON.stringify(response.movies);
            movies = JSON.parse(movies);
            var promises = [];
            for(var m in movies) {
                var movie = movies[m];
                var promise = movieModel.findMovie(movie);
                promise
                    .then(function (response) {
                        _movies.push(response)
                    });
                promises.push(promise);
            }
            Promise.all(promises)
                .then(function (response) {
                    res.json(_movies);
                })
        })
}