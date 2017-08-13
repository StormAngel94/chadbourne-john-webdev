/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var movieSchema = mongoose.Schema({
    tags:       [{type: mongoose.Schema.Types.ObjectId, ref:"tagSchema"}],
    favs:       {type: Number, default: 0},
    tmdbId:     String
});
module.exports = movieSchema;