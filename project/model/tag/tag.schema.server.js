/**
 * Created by ember on 8/12/2017.
 */

var mongoose = require("mongoose");
var tagSchema = mongoose.Schema({
    name:           String,
    description:    String,
    movies:         [{type: mongoose.Schema.Types.ObjectId, ref:"movieSchema"}],
    favs:           Number
});
module.exports = tagSchema;