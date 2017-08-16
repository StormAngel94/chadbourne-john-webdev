/**
 * Created by ember on 8/12/2017.
 */
var movieModel = require("../model/movie/movie.model.server");

module.exports = function () {
    var app = require("../../express");

    app.get("/api/movie/:mid", findMovie);
    app.post("/api/movie/create/:mid", createMovie);
    app.put("/api/movie/addFav/:mid", addFav);
    app.put("/api/movie/removeFav/:mid", removeFav);
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
    movieModel.createMovie(mid)
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