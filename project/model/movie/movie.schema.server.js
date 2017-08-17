/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var movieSchema = mongoose.Schema({
    title:      String,
    tags:       {type: [String], default: []},
    favs:       {type: Number, default: 0},
    tmdbId:     String
});
module.exports = movieSchema;