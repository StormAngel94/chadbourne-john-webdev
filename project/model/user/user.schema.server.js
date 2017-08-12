/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username:       String,
    password:       String,
    firstName:      String,
    lastName:       String,
    email:          String,
    dateCreated:    {type: Date, default: Date.now}
});
module.exports = userSchema;