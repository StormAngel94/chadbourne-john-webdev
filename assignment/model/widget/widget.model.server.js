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
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pid) {
    return widgetModel.find({_id: pid});
}

function findWidgetById(wgid) {
    return widgetModel.findOne({_id: wgid});
}

function updateWidget(wgid, widget) {
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