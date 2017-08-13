/**
 * Created by ember on 8/12/2017.
 */
var movieModel = require("../model/movie/movie.model.server");

module.exports = function () {
    var app = require("../../express");

    app.get("/api/movie/:mid", findMovie);
    app.post("/api/movie/create/:mid", createMovie);
};

function findMovie(req, res) {
    var mid = req.params.mid;
    movieModel.findMovie(mid)
        .then(function (response) {
            res.json(response);
        })
}

function createMovie(req, res) {
    var mid = req.params.mid;
    movieModel.createMovie(mid)
        .then(function (response) {
            res.json(response);
        })
}