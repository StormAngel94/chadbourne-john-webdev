/**
 * Created by ember on 8/12/2017.
 */
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds157380.mlab.com:57380/heroku_zlschfv1'; // user yours
}

mongoose.connect(connectionString);

require("./user/user.model.server");
require("./movie/movie.model.server");
require("./tag/tag.model.server");