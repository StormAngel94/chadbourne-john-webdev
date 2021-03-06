/**
 * Created by ember on 8/5/2017.
 */
var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");

var widgetModel = mongoose.model("widgetModel", widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pid, widget){
    widget._page = pid;
    var _widget = new widgetModel(widget);
    _widget.save(function (err, widget) {
        if (err) return console.error(err);
        return widget;
    });
    return _widget;
}

function findAllWidgetsForPage(pid) {
    return widgetModel
        .find({_page: pid})
        .populate('_page', 'name')
        .exec();
}

function findWidgetById(wgid) {
    return widgetModel.findOne({_id: wgid});
}

function updateWidget(wgid, widget) {
    if (!widget.rows) {widget.rows = 0;}
    if (!widget.size) {widget.size = 0;}
    return widgetModel.update({_id: wgid}, {$set: {
        name:           widget.name,
        text:           widget.text,
        placeholder:    widget.placeholder,
        description:    widget.description,
        url:            widget.url,
        width:          widget.width,
        height:         widget.height,
        rows:           widget.rows,
        size:           widget.size,
        class:          widget.class,
        icon:           widget.icon
    }});
}

function deleteWidget(wgid) {
    return widgetModel.delete({_id: wgid});
}

function reorderWidget(pageId, start, end)  {

}