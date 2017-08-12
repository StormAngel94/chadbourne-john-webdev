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
module.exports = movieModel;


function addFav(mid) {
    return movieModel.update({_id: mid}, {$inc: {
        favs: 1
    }})
}

function removeFav(mid) {
    return movieModel.update({_id: mid}, {$inc: {
        favs: -1
    }})
}

function addTag(mid, tid) {
    return movieModel.update({_id: mid}, {$push: {
        tags: tid
    }})
}

function removeTag(mid, tid) {
    return movieModel.update({_id: mid}, {$pull: {
        tags: tid
    }})
}