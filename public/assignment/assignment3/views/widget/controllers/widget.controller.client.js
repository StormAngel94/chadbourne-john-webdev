/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController() {

    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController() {

    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($scope, widgetService) {
        var wgid = $routeParams["wgid"];
        $scope.widget = widgetService.findWidgetById(wgid);

        $scope.updateCurr = function (widget) {
            websiteService.updateWidget(widget);
        };
    }
})();