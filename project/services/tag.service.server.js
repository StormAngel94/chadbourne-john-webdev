/**
 * Created by ember on 8/12/2017.
 */
var tagModel= require("../model/tag/tag.model.server");
module.exports = function () {
    var app = require("../../express");

    app.get("/api/search/tag/:tag", searchTags);
};

function searchTags(req, res) {
    tagModel.searchTags(req.params.tag)
        .then(function (response) {
            res.json(response.data);
        })
}