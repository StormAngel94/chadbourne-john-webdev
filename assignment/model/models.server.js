/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");

var connectionString = 'mongodb://127.0.0.1:27017/assignment'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds157380.mlab.com:57380/heroku_zlschfv1'; // user yours
}

mongoose.connect(connectionString);

require("./user/user.model.server");
require("./page/page.model.server");
require("./website/website.model.server");
require("./widget/widget.model.server");