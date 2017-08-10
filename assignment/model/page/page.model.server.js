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
    page._wid = wid;
    var _page = new pageModel(page);
    _page.save(function (err, page) {
        if (err) return console.error(err);
        return page;
    });
    return _page;
}

function findAllPagesForWebsite(wid) {
    return pageModel
        .find({_website: wid})
        .populate('_website', 'name')
        .exec();
}

function findPageById(pid) {
    return pageModel.findOne({_id: pid})
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