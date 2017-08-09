/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    _website:       {type: mongoose.Schema.Types.ObjectId, ref:"websiteModel"},
    name:           String,
    title:          String,
    description:    String,
    widgets:        [{type: mongoose.Schema.Types.ObjectId, ref:"widgetModel"}],
    dateCreated:    {type: Date, default: Date.now}
});
module.exports = pageSchema;