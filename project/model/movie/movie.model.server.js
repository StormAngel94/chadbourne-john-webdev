/**
 * Created by ember on 8/12/2017.
 */
var mongoose = require("mongoose");
var movieSchema = require("./movie.schema.server");
var movieModel = mongoose.model("movieModel", movieSchema);

movieModel.addFav = addFav;
movieModel.removeFav = removeFav;
movieModel.addTag = addTag;
movieModel.removeTag = removeTag;
movieModel.findMovie = findMovie;
movieModel.createMovie = createMovie;
movieModel.findAllMovies = findAllMovies;
movieModel.deleteMovie = deleteMovie;
movieModel.updateMovie = updateMovie;

module.exports = movieModel;


function addFav(mid) {
    return movieModel.update({tmdbId: mid}, {$inc: {
        favs: 1
    }})
}

function removeFav(mid) {
    return movieModel.update({tmdbId: mid}, {$inc: {
        favs: -1
    }})
}

function addTag(mid, tag) {
    return movieModel.update({tmdbId: mid}, {$push: {
        tags: tag
    }})
}

function removeTag(mid, tid) {
    return movieModel.update({tmdbId: mid}, {$pull: {
        tags: tid
    }})
}

function findMovie(mid) {
    return movieModel
        .findOne({tmdbId: mid})
}

function createMovie(mid, title) {
    var _movie = new movieModel();
    _movie.tmdbId = mid;
    _movie.title = title;
    _movie.save(function (err, movie) {
        if (err) return console.error(err);
        return movie
    });
    return  _movie;
}

function findAllMovies() {
    return movieModel.find({});
}

function deleteMovie(mid) {
    return movieModel.remove({tmdbId: mid});
}

function updateMovie(mid, movie) {
    return movieModel.update({tmdbId: mid}, {$set: {
        title:      movie.title,
        favs:       movie.favs
    }});
}