/**
 * Created by ember on 7/22/2017.
 */
(function () {
    angular
        .module("webAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, $location, $sce, widgetService) {
        var vm = this;

        vm.edit = edit;
        vm.profile = profile;
        vm.back = back;
        vm.new = newWidget;
        vm.trustHTML = trustHTML;
        vm.trustUrl = trustUrl;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];

        function init() {
            var promise = widgetService.findWidgetsByPageId(vm.pid);
            promise
                .then(function (response) {
                    vm.widgets = response.data
                });
        }
        init();

        function edit(widget) {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
        }

        function profile() {
            $location.url("/user/" + vm.uid);
        }

        function back() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
        }

        function newWidget() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/new");
        }

        function trustHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function trustUrl(url) {
            var youtubeUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split("/");
            youtubeUrl += urlParts[urlParts.length-1];
            return $sce.trustAsResourceUrl(youtubeUrl);
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {
        var vm = this;

        vm.profile = profile;
        vm.cancel = cancel;
        vm.newWidget = newWidget;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        function init() {
            var promise = widgetService.findWidgetById(vm.wgid);
            promise
                .then(function (response) {
                    vm.widget = response.data;
                })
        }
        init();

        function profile() {
            $location.url("/user/" + vm.uid);
        }

        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }

        function newWidget(widgetType) {
            var _widget = {};
            _widget.widgetType = widgetType;
            var promise = widgetService.createWidget(vm.pid, _widget);
            promise
                .then(function (response) {
                    _widget = response.data;
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/"
                        + _widget._id);
                })
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this;

        vm.updateCurr = updateCurr;
        vm.cancel = cancel;
        vm.delete = deleteWidget;
        vm.profile = profile;
        vm.search = search;

        vm.uid = $routeParams["uid"];
        vm.wid = $routeParams["wid"];
        vm.pid = $routeParams["pid"];
        vm.wgid = $routeParams["wgid"];
        function init() {
            var promise = widgetService.findWidgetById(vm.wgid);
            promise
                .then(function (response) {
                        vm.widget = response.data;
                    }
                )
        }
        init();

        function updateCurr (widget) {
            var promise = widgetService.updateWidget(vm.wgid, widget);
            promise
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                })
        }

        function cancel() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
        }

        function deleteWidget() {
            var promise = widgetService.deleteWidget(vm.wgid);
            promise
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/");
                })
        }

        function profile() {
            $location.url("/user/" + vm.uid);
        }

        function search() {
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid + "/search/");
        }
    }
})();

(function () {
    angular
        .module("webAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, widgetService, flickrService) {
        var vm = this;

        vm.searchPhoto = searchPhoto;
        vm.selectPhoto = selectPhoto;

        function searchPhoto(searchTerm) {
            flickrService
                .searchPhoto(searchTerm)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var _url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            _url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var uid = $routeParams["uid"];
            var wid = $routeParams["wid"];
            var pid = $routeParams["pid"];
            var wgid = $routeParams["wgid"];
            var widget = widgetService.findWidgetById(wgid);
            widget.url = _url;
            widgetService
                .updateWidget(wgid, widget)
                .then(
                    $location.url("/user/"+ uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid)
                );
        }
    }

})();