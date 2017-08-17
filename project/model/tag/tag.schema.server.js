/**
 * Created by ember on 8/12/2017.
 */

var mongoose = require("mongoose");
var tagSchema = mongoose.Schema({
    name:           String,
    description:    String,
    movies:         {type: [String], default: []},
    favs:           {type: Number, default: 0}
});
module.exports = tagSchema;