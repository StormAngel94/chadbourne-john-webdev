/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");

var pageModel = mongoose.model("pageModel", pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(wid, page) {
    page._website = wid;
    return pageModel.create(page);
}

function findAllPagesForWebsite(wid) {
    return pageModel.find({_website: wid});
}

function findPageById(wid) {
    return pageModel.findOne({_website: wid})
}

function updatePage(pid, page) {
    return pageModel.update({_id: pid}, {$set: {
        name:           page.name,
        title:          page.title,
        description:    page.description
    }})
}

function deletePage(pageId) {
    return pageModel.deletePage({_id: pageId})
}