/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $location, widgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        function init() {
            vm.widgets= widgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        vm.edit = edit;
        function edit(widget) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }

        vm.back = back;
        function back() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        vm.new = newWidget;
        function newWidget() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new");
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        function init() {
            vm.widget = widgetService.findWidgetById(vm.wgid);
        }
        init();

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }

        vm.cancel = cancel;
        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }

        vm.newWidget = newWidget;
        function newWidget(widgetType) {
            var _widget = {};
            _widget.widgetType = widgetType;
            widgetService.createWidget(vm.pid, _widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + _widget._id);
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this;
        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        function init() {
            vm.widget = widgetService.findWidgetById(vm.wgid);
        }
        init();

        vm.updateCurr = updateCurr;
        function updateCurr (widget) {
            widgetService.updateWidget(vm.wgid, widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }

        vm.cancel = cancel;
        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }

        vm.delete = deleteWidget;
        function deleteWidget() {
            widgetService.deleteWidget(vm.wgid);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }

        vm.profile = profile;
        function profile() {
            $location.url("/user/" + vm.uid);
        }
    }
})();