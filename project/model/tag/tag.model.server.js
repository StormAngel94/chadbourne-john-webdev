/**
 * Created by ember on 8/12/2017.
 */
var mongoose = require("mongoose");
var tagSchema = require("./tag.schema.server");
var tagModel = mongoose.model("tagModel", tagSchema);

tagModel.addFav = addFav;
tagModel.removeFav = removeFav;
tagModel.addMovie = addMovie;
tagModel.removeMovie = removeMovie;
tagModel.updateTag = updateTag;
tagModel.searchTags = searchTags;
module.exports = tagModel;


function addFav(mid) {
    return tagModel.update({_id: mid}, {$inc: {
        favs: 1
    }})
}

function removeFav(mid) {
    return tagModel.update({_id: mid}, {$inc: {
        favs: -1
    }})
}

function addMovie(tid, mid) {
    return tagModel.update({_id: tid}, {$push: {
        tags: mid
    }})
}

function removeMovie(tid, mid) {
    return tagModel.update({_id: tid}, {$pull: {
        tags: mid
    }})
}

function updateTag(tid, tag) {
    return tagModel.update({_id: tid}, {$set: {
        name: tag.name,
        description: tag.description
    }})
}

function searchTags(tag) {
    var searchTerm = '.*' + tag + '.*';
    return tagModel.find({username: {$regex : searchTerm}})
}