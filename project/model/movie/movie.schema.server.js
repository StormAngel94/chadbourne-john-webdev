/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var movieSchema = mongoose.Schema({
    tags: [{type: mongoose.Schema.Types.ObjectId, ref:"tagSchema"}],
    favs: Number
});
module.exports = movieSchema;