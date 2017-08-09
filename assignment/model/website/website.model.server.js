/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");

var websiteModel = mongoose.model("websiteModel", websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

function createWebsiteForUser(uid, website) {
    website._user = uid;
    return websiteModel.create(website)
}

function findAllWebsitesForUser(uid) {
    return websiteModel.find({_user: uid});
}

function findWebsiteById(wid) {
    return websiteModel.findOne({_id: wid});
}

function updateWebsite(wid, website) {
    return websiteModel.update({_id: wid}, {$set: {
        name:           website.name,
        description:    website.description
    }})
}

function deleteWebsite(wid) {
    return websiteModel.remove({_id: wid})
}

module.exports = websiteModel;
