/**
 * Created by ember on 8/12/2017.
 */
var movieModel = require("../model/movie/movie.model.server");

module.exports = function () {
    var app = require("../../express");

    app.get("/api/movie/:mid", findMovie);
    app.get("/api/movie/all/all", findAllMovies);
    app.post("/api/movie/create/:mid", createMovie);
    app.put("/api/movie/addFav/:mid", addFav);
    app.put("/api/movie/removeFav/:mid", removeFav);
    app.put("/api/movie/:mid/addTag/:tag" , addTag);
    app.put("/api/movie/:mid/removeTag/:tid", removeTag);
};

function findMovie(req, res) {
    var mid = req.params.mid;
    movieModel.findMovie(mid)
        .then(function(movie) {
            res.json(movie)
        });
}

function createMovie(req, res) {
    var mid = req.params.mid;
    var title = req.query.title;
    movieModel.createMovie(mid, title)
        .then(function (movie) {
            res.json(movie);
        })
}

function addFav(req, res) {
    var mid = req.params.mid;
    movieModel.addFav(mid)
        .then(function (movie) {
            res.json(movie);
        })
}

function removeFav(req, res) {
    var mid = req.params.mid;
    movieModel.removeFav(mid)
        .then(function (movie) {
            res.json(movie);
        })
}

function addTag(req, res) {
    var mid = req.params.mid;
    var tag = req.params.tag;
    movieModel.addTag(mid, tag)
        .then(function (movie) {
            res.json(movie);
        })
}

function findAllMovies(req, res) {
    movieModel.findAllMovies()
        .then(function (movie) {
            res.json(movie);
        })
}

function removeTag(req, res) {
    var mid = req.params.mid;
    var tid = req.params.tid;
    movieModel.removeTag(mid, tid)
        .then(function (movie) {
            res.json(movie);
        })
}