/**
 * Created by ember on 8/12/2017.
 */
module.exports = function(app) {
    require("./services/user.service.server")(app);
    require("./services/movie.service.server")(app);
    require("./services/tag.service.server")(app);
    require("./model/models.server.js");
};