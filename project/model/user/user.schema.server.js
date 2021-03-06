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
    movies:         {type: [Number], default: []},
    tags:           {type: [{type: mongoose.Schema.Types.ObjectId, ref:"tagSchema"}], default: []},
    users:           {type: [{type: mongoose.Schema.Types.ObjectId, ref:"userSchema"}], default: []},
    dateCreated:    {type: Date, default: Date.now},
    isAdmin:        {type: Boolean, default: false}
});
module.exports = userSchema;